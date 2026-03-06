import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';
import { formatDateForInput } from '../constants';

const EMPTY_FORM = {
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
  isCurrentJob: false,
};

const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    profileService.getExperiences()
      .then((data) => setExperiences(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const openAdd = useCallback(() => {
    setEditingExp(null);
    setForm(EMPTY_FORM);
    setError(null);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((exp) => {
    setEditingExp(exp);
    setForm({
      title: exp.title || '',
      company: exp.company || '',
      startDate: formatDateForInput(exp.startDate),
      endDate: formatDateForInput(exp.endDate),
      description: exp.description || '',
      isCurrentJob: !!exp.isCurrentJob,
    });
    setError(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingExp(null);
    setError(null);
  }, []);

  const changeForm = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'isCurrentJob' && checked) next.endDate = '';
      return next;
    });
  }, []);

  const save = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const payload = {
        title: form.title,
        company: form.company,
        startDate: form.startDate,
        endDate: form.isCurrentJob ? null : form.endDate || null,
        description: form.description,
        isCurrentJob: form.isCurrentJob,
      };
      if (editingExp) {
        const updated = await profileService.updateExperience(editingExp.experienceID, payload);
        setExperiences((prev) =>
          prev.map((x) => (x.experienceID === editingExp.experienceID ? updated : x))
        );
      } else {
        const created = await profileService.createExperience(payload);
        setExperiences((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch {
      setError(editingExp ? 'Failed to update experience.' : 'Failed to add experience.');
    } finally {
      setSaving(false);
    }
  }, [editingExp, form]);

  const remove = useCallback(async (experienceID) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await profileService.deleteExperience(experienceID);
      setExperiences((prev) => prev.filter((x) => x.experienceID !== experienceID));
    } catch {
      // silent fail
    }
  }, []);

  return {
    experiences,
    isModalOpen,
    editingExp,
    form,
    saving,
    error,
    openAdd,
    openEdit,
    closeModal,
    changeForm,
    save,
    remove,
  };
};

export default useExperiences;
