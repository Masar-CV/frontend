import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';

const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [form, setForm] = useState({ skillName: '', proficiencyLevel: 1 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    profileService.getSkills()
      .then((data) => setSkills(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const openAdd = useCallback(() => {
    setEditingSkill(null);
    setForm({ skillName: '', proficiencyLevel: 1 });
    setError(null);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((skill) => {
    setEditingSkill(skill);
    setForm({ skillName: skill.skillName, proficiencyLevel: skill.proficiencyLevel });
    setError(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingSkill(null);
    setError(null);
  }, []);

  const changeForm = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'proficiencyLevel' ? Number(value) : value,
    }));
  }, []);

  const save = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      if (editingSkill) {
        const updated = await profileService.updateSkill(editingSkill.skillID, form);
        setSkills((prev) =>
          prev.map((s) => (s.skillID === editingSkill.skillID ? updated : s))
        );
      } else {
        const created = await profileService.createSkill(form);
        setSkills((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch {
      setError(editingSkill ? 'Failed to update skill.' : 'Failed to add skill.');
    } finally {
      setSaving(false);
    }
  }, [editingSkill, form]);

  const remove = useCallback(async (skillID) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await profileService.deleteSkill(skillID);
      setSkills((prev) => prev.filter((s) => s.skillID !== skillID));
    } catch {
      // silent fail
    }
  }, []);

  return {
    skills,
    isModalOpen,
    editingSkill,
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

export default useSkills;
