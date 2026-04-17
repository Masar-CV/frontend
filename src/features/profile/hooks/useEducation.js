import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';

const EMPTY_FORM = {
  degree: '',
  university: '',
  startYear: '',
  endYear: '',
  gpa: '',
  fieldOfStudy: '',
};

const normalizeEducation = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.education)) return payload.education;
  if (Array.isArray(payload?.educations)) return payload.educations;
  return [];
};

const normalizeEducationItem = (payload) => {
  if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) return payload.data;
  if (payload?.education && typeof payload.education === 'object' && !Array.isArray(payload.education)) return payload.education;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) return payload;
  return null;
};

const getEducationId = (item) => item?.educationID || item?.educationId || item?.id || null;

const toInputValue = (value) => {
  if (value === null || value === undefined || value === '') return '';
  return String(value);
};

const toYearValue = (value) => {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'number') return value;

  const direct = Number(value);
  if (Number.isFinite(direct) && String(value).length <= 4) return direct;

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date.getFullYear();

  return '';
};

const buildFormFromEducation = (item) => ({
  degree: toInputValue(item?.degree || item?.degreeName || item?.program || ''),
  university: toInputValue(item?.university || item?.institution || item?.school || item?.college || ''),
  startYear: toInputValue(toYearValue(item?.startYear ?? item?.startDate ?? item?.year ?? item?.graduationYear)),
  endYear: toInputValue(toYearValue(item?.endYear ?? item?.endDate ?? item?.graduationYear ?? item?.year)),
  gpa: toInputValue(item?.gpa ?? item?.GPA ?? item?.cgpa ?? item?.grade ?? ''),
  fieldOfStudy: toInputValue(item?.fieldOfStudy || item?.major || item?.program || ''),
});

const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const fetchEducation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getEducation();
      setEducation(normalizeEducation(data));
    } catch {
      setEducation([]);
      setError('Failed to load education.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const openAdd = useCallback(() => {
    setEditingEducation(null);
    setForm(EMPTY_FORM);
    setSaveError(null);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((item) => {
    setEditingEducation(item);
    setForm(buildFormFromEducation(item));
    setSaveError(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEducation(null);
    setSaveError(null);
  }, []);

  const changeForm = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const save = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveError(null);
      const payload = {
        degree: form.degree.trim(),
        university: form.university.trim(),
        startYear: Number(form.startYear),
        endYear: Number(form.endYear),
        gpa: Number(form.gpa),
        fieldOfStudy: form.fieldOfStudy.trim(),
      };

      if (editingEducation) {
        const educationId = getEducationId(editingEducation);
        if (!educationId) {
          throw new Error('Education ID is missing');
        }
        const updated = await profileService.updateEducation(educationId, payload);
        const updatedItem = normalizeEducationItem(updated);

        if (updatedItem) {
          setEducation((prev) =>
            prev.map((item) => (getEducationId(item) === educationId ? updatedItem : item))
          );
        } else {
          await fetchEducation();
        }
      } else {
        const created = await profileService.createEducation(payload);
        const createdItem = normalizeEducationItem(created);
        if (createdItem) {
          setEducation((prev) => [...prev, createdItem]);
        } else {
          await fetchEducation();
        }
      }

      setIsModalOpen(false);
      setEditingEducation(null);
      setForm(EMPTY_FORM);
    } catch {
      setSaveError(editingEducation ? 'Failed to update education.' : 'Failed to add education.');
    } finally {
      setSaving(false);
    }
  }, [editingEducation, fetchEducation, form]);

  return {
    education,
    loading,
    error,
    isModalOpen,
    editingEducation,
    form,
    saving,
    saveError,
    openAdd,
    openEdit,
    closeModal,
    changeForm,
    save,
    refresh: fetchEducation,
  };
};

export default useEducation;
