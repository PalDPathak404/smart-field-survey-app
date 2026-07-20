import * as FileSystem from 'expo-file-system';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const SURVEYS_FILE = FileSystem.documentDirectory + 'surveys.json';

export type SurveyPriority = 'low' | 'medium' | 'high';

export type CapturedPhoto = {
  uri: string;
  capturedAt: string;
};

export type Survey = {
  id: string;
  siteName: string;
  clientName: string;
  description: string;
  priority: SurveyPriority;
  date: string;
  createdAt: string;
  contact?: string;
  location?: string;
  notes?: string;
  photoUri?: string;
  photoCount: number;
};

type SurveyEvent = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

type SurveyContextValue = {
  surveys: Survey[];
  surveyTitle: string;
  status: string;
  notes: string;
  photos: CapturedPhoto[];
  photoCount: number;
  activeContact: string;
  locationLabel: string;
  recentEvents: SurveyEvent[];
  clipboardSurveyId: string;
  clipboardContact: string;
  clipboardLocation: string;
  createSurvey: (survey: Omit<Survey, 'id' | 'createdAt' | 'contact' | 'location' | 'notes' | 'photoUri' | 'photoCount'>) => string;
  updateSurvey: (id: string, updates: Partial<Omit<Survey, 'id' | 'createdAt'>>) => void;
  deleteSurvey: (id: string) => void;
  getSurveyById: (id: string) => Survey | undefined;
  recordPhotoCapture: (note: string) => void;
  addPhoto: (photo: CapturedPhoto) => void;
  removePhoto: (uri: string) => void;
  saveNote: (nextNote: string) => void;
  recordLocationUpdate: (location: string) => void;
  recordContactSelection: (contact: string) => void;
  setClipboardSurveyId: (id: string) => void;
  setClipboardContact: (contact: string) => void;
  setClipboardLocation: (location: string) => void;
  clearClipboard: () => void;
  submitSurvey: (id: string) => void;
};

const SurveyContext = createContext<SurveyContextValue | undefined>(undefined);

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(SURVEYS_FILE);
        if (fileInfo.exists) {
          const contents = await FileSystem.readAsStringAsync(SURVEYS_FILE);
          if (contents) {
            setSurveys(JSON.parse(contents));
          }
        }
      } catch (error) {
        console.error('Failed to load surveys:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSurveys();
  }, []);

  useEffect(() => {
    const saveSurveys = async () => {
      if (!isLoaded) return;
      try {
        await FileSystem.writeAsStringAsync(SURVEYS_FILE, JSON.stringify(surveys));
      } catch (error) {
        console.error('Failed to save surveys:', error);
      }
    };
    saveSurveys();
  }, [surveys, isLoaded]);
  const [surveyTitle, setSurveyTitle] = useState('Field Survey');
  const [status, setStatus] = useState('Ready');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [activeContact, setActiveContact] = useState('');
  const [locationLabel, setLocationLabel] = useState('');
  const [recentEvents, setRecentEvents] = useState<SurveyEvent[]>([]);
  const [clipboardSurveyId, setClipboardSurveyId] = useState('');
  const [clipboardContact, setClipboardContact] = useState('');
  const [clipboardLocation, setClipboardLocation] = useState('');

  const addEvent = useCallback((title: string, detail: string) => {
    const event: SurveyEvent = {
      id: `${Date.now()}`,
      title,
      detail,
      time: formatTime(),
    };
    setRecentEvents((current) => [event, ...current].slice(0, 4));
  }, []);

  const createSurvey = useCallback(
    (survey: Omit<Survey, 'id' | 'createdAt' | 'contact' | 'location' | 'notes' | 'photoUri' | 'photoCount'>) => {
      const newSurvey: Survey = {
        ...survey,
        id: `survey-${Date.now()}`,
        createdAt: new Date().toISOString(),
        contact: activeContact,
        location: locationLabel,
        notes,
        photoUri: photos[0]?.uri,
        photoCount,
      };
      setSurveys((current) => [newSurvey, ...current]);
      setSurveyTitle(newSurvey.siteName);
      setStatus('Survey created');
      setClipboardSurveyId(newSurvey.id);
      addEvent('Survey created', `${newSurvey.siteName} - ${newSurvey.clientName}`);
      return newSurvey.id;
    },
    [activeContact, addEvent, locationLabel, notes, photoCount, photos],
  );

  const updateSurvey = useCallback(
    (id: string, updates: Partial<Omit<Survey, 'id' | 'createdAt'>>) => {
      setSurveys((current) =>
        current.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      );
      setStatus('Survey updated');
      setClipboardSurveyId(id);
      addEvent('Survey updated', `Survey ${id.slice(0, 8)}...`);
    },
    [addEvent],
  );

  const deleteSurvey = useCallback(
    (id: string) => {
      setSurveys((current) => current.filter((s) => s.id !== id));
      setStatus('Survey deleted');
      if (clipboardSurveyId === id) {
        setClipboardSurveyId('');
      }
      addEvent('Survey deleted', `Survey ${id.slice(0, 8)}...`);
    },
    [addEvent, clipboardSurveyId],
  );

  const getSurveyById = useCallback(
    (id: string) => surveys.find((s) => s.id === id),
    [surveys],
  );

  const submitSurvey = useCallback(
    (id: string) => {
      setStatus('Survey submitted');
      setClipboardSurveyId(id);
      addEvent('Survey submitted', `Survey ${id.slice(0, 8)}...`);
    },
    [addEvent],
  );

  const setClipboardSurveyIdValue = useCallback(
    (id: string) => {
      setClipboardSurveyId(id);
      addEvent('Clipboard survey copied', id);
    },
    [addEvent],
  );

  const setClipboardContactValue = useCallback(
    (contact: string) => {
      setClipboardContact(contact);
      addEvent('Clipboard contact copied', contact);
    },
    [addEvent],
  );

  const setClipboardLocationValue = useCallback(
    (location: string) => {
      setClipboardLocation(location);
      addEvent('Clipboard location copied', location);
    },
    [addEvent],
  );

  const clearClipboard = useCallback(() => {
    setClipboardSurveyId('');
    setClipboardContact('');
    setClipboardLocation('');
    setStatus('Clipboard cleared');
    addEvent('Clipboard cleared', 'All clipboard data cleared');
  }, [addEvent]);

  const addPhoto = useCallback((photo: CapturedPhoto) => {
    setPhotos((current) => [photo, ...current]);
  }, []);

  const removePhoto = useCallback(
    (uri: string) => {
      setPhotos((current) => current.filter((p) => p.uri !== uri));
      setPhotoCount((current) => Math.max(0, current - 1));
      addEvent('Photo deleted', 'Photo removed from survey');
    },
    [addEvent],
  );

  const recordPhotoCapture = useCallback(
    (note: string) => {
      setPhotoCount((current) => current + 1);
      setStatus('Photo captured');
      addEvent('Photo captured', note || 'Site evidence logged');
    },
    [addEvent],
  );

  const saveNote = useCallback(
    (nextNote: string) => {
      const trimmed = nextNote.trim();
      setNotes(trimmed || '');
      setStatus('Note saved');
      addEvent('Note saved', trimmed || 'Empty note');
    },
    [addEvent],
  );

  const recordLocationUpdate = useCallback(
    (nextLocation: string) => {
      setLocationLabel(nextLocation);
      setStatus('Location updated');
      addEvent('Location updated', nextLocation);
    },
    [addEvent],
  );

  const recordContactSelection = useCallback(
    (nextContact: string) => {
      setActiveContact(nextContact);
      setStatus('Contact selected');
      addEvent('Contact selected', nextContact);
    },
    [addEvent],
  );

  const value = useMemo<SurveyContextValue>(
    () => ({
      surveys,
      surveyTitle,
      status,
      notes,
      photos,
      photoCount,
      activeContact,
      locationLabel,
      recentEvents,
      clipboardSurveyId,
      clipboardContact,
      clipboardLocation,
      createSurvey,
      updateSurvey,
      deleteSurvey,
      getSurveyById,
      recordPhotoCapture,
      addPhoto,
      removePhoto,
      saveNote,
      recordLocationUpdate,
      recordContactSelection,
      setClipboardSurveyId: setClipboardSurveyIdValue,
      setClipboardContact: setClipboardContactValue,
      setClipboardLocation: setClipboardLocationValue,
      clearClipboard,
      submitSurvey,
    }),
    [
      activeContact,
      clearClipboard,
      clipboardContact,
      clipboardLocation,
      clipboardSurveyId,
      createSurvey,
      deleteSurvey,
      getSurveyById,
      locationLabel,
      notes,
      photoCount,
      photos,
      recordContactSelection,
      recordLocationUpdate,
      recordPhotoCapture,
      removePhoto,
      saveNote,
      setClipboardContactValue,
      setClipboardLocationValue,
      setClipboardSurveyIdValue,
      status,
      surveyTitle,
      recentEvents,
      submitSurvey,
      updateSurvey,
      surveys,
    ],
  );

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
