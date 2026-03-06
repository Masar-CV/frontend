import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    location: '',
    linkedInURL: '',
    githubURL: '',
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // About state
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [savingAbout, setSavingAbout] = useState(false);
  const [aboutError, setAboutError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await profileService.getProfile();
        setProfile(data);
        setAboutText(data.about || '');
        setEditForm({
          fullName: data.fullName || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedInURL: data.linkedInURL || '',
          githubURL: data.githubURL || '',
        });
      } catch {
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // --- Profile edit handlers ---
  const openEdit = useCallback(() => {
    setEditForm({
      fullName: profile?.fullName || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      linkedInURL: profile?.linkedInURL || '',
      githubURL: profile?.githubURL || '',
    });
    setSaveError(null);
    setIsEditing(true);
  }, [profile]);

  const closeEdit = useCallback(() => {
    setIsEditing(false);
    setSaveError(null);
  }, []);

  const changeEditForm = useCallback((e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const saveProfile = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveError(null);
      const updated = await profileService.updateProfile(editForm);
      if (updated && updated.fullName !== undefined) {
        setProfile(updated);
      } else {
        setProfile((prev) => ({ ...prev, ...editForm }));
      }
      setIsEditing(false);
    } catch {
      setSaveError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [editForm]);

  // --- About edit handlers ---
  const openAboutEdit = useCallback(() => {
    setAboutText(profile?.about || '');
    setAboutError(null);
    setIsEditingAbout(true);
  }, [profile]);

  const closeAboutEdit = useCallback(() => {
    setIsEditingAbout(false);
    setAboutError(null);
  }, []);

  const saveAbout = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSavingAbout(true);
      setAboutError(null);
      const updated = await profileService.updateAbout(aboutText);
      setProfile((prev) => ({ ...prev, about: updated?.about ?? aboutText }));
      setIsEditingAbout(false);
    } catch {
      setAboutError('Failed to update about section. Please try again.');
    } finally {
      setSavingAbout(false);
    }
  }, [aboutText]);

  return {
    profile,
    loading,
    error,

    // profile edit
    isEditing,
    editForm,
    saving,
    saveError,
    openEdit,
    closeEdit,
    changeEditForm,
    saveProfile,

    // about edit
    isEditingAbout,
    aboutText,
    setAboutText,
    savingAbout,
    aboutError,
    openAboutEdit,
    closeAboutEdit,
    saveAbout,
  };
};

export default useProfile;
