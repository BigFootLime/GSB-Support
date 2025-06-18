import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CustomTextInput } from '@/components/ui/Input';
import { CustomButton } from '@/components/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomPickerWithBadge } from '@/components/ui/CustomPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/hooks/useAuth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Toast from 'react-native-toast-message';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';


const TicketSchema = z.object({
  title: z.string().min(3, 'Titre requis'),
  description: z.string().min(10, 'Description trop courte'),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    required_error: 'Sélectionne une priorité',
  }),
  category: z.enum(['hardware', 'software', 'network', 'access', 'other'], {
    required_error: 'Catégorie requise',
  }),
  location: z.string().optional(),
  model: z.string().optional(),
  os: z.enum(['android', 'ios', 'windows', 'macos', 'linux']),
  version: z.string().optional(),
  dueDate: z.date().optional(),
});

type TicketFormType = z.infer<typeof TicketSchema>;

export function TicketForm({
  onClose,
  hideForm,
  onSuccessConfirm,
}: {
  onClose: () => void;
  hideForm: () => void;
  onSuccessConfirm: () => void;
}) {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormType>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'software',
      location: '',
      model: '',
      os: 'android',
      version: '',
      dueDate: undefined,
    },
  });

  const onSubmit = async (data: TicketFormType) => {
    Toast.show({
      type: 'info',
      text1: '🔄 Envoi du ticket...',
    });

    const ticketToCreate = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      category: data.category,
      location: data.location,
      assignedTo: user?.uid || '',
      createdBy: user?.uid || '',
      status: 'new',
      createdAt: serverTimestamp(),
      dueDate: data.dueDate ?? null,
      deviceInfo: {
        model: data.model,
        os: data.os,
        version: data.version,
      },
    };

    try {
      await addDoc(collection(db, 'tickets'), ticketToCreate);
      hideForm();
      onSuccessConfirm();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: "Impossible d'enregistrer le ticket.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{ flex: 1 }}
    keyboardVerticalOffset={80} // ajuste selon ta nav bar
  >
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 4 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
    <View style={{ gap: 10 }}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Titre"
            placeholder="Ex: Problème Wi-Fi"
            value={value}
            onChangeText={onChange}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Description"
            placeholder="Décris le souci..."
            value={value}
            onChangeText={onChange}
            multiline
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { value, onChange } }) => (
          <CustomPickerWithBadge
            label="Priorité"
            value={value}
            onChange={onChange}
            options={[
              { label: 'Faible', value: 'low' },
              { label: 'Moyenne', value: 'medium' },
              { label: 'Haute', value: 'high' },
              { label: 'Critique', value: 'critical' },
            ]}
            showBadge
            badgeColors={{
              low: '#10b981',
              medium: '#facc15',
              high: '#f97316',
              critical: '#ef4444',
            }}
            error={errors.priority?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <CustomPickerWithBadge
            label="Catégorie"
            value={value}
            onChange={onChange}
            options={[
              { label: 'Matériel', value: 'hardware' },
              { label: 'Logiciel', value: 'software' },
              { label: 'Réseau', value: 'network' },
              { label: 'Accès', value: 'access' },
              { label: 'Autre', value: 'other' },
            ]}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Lieu (optionnel)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <CustomTextInput label="Infos sur l'appareil" editable={false} />

      <Controller
        control={control}
        name="model"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput label="Modèle" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="os"
        render={({ field: { value, onChange } }) => (
          <CustomPickerWithBadge
            label="Système"
            value={value}
            onChange={onChange}
            options={[
              { label: 'Android', value: 'android' },
              { label: 'iOS', value: 'ios' },
              { label: 'Windows', value: 'windows' },
              { label: 'macOS', value: 'macos' },
              { label: 'Linux', value: 'linux' },
            ]}
            error={errors.os?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="version"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput label="Version" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field: { value, onChange } }) => (
          <View>
            <Text style={{ marginBottom: 4, fontWeight: '500', color: '#1e293b' }}>
              Date d'échéance
            </Text>
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => selectedDate && onChange(selectedDate)}
            />
          </View>
        )}
      />

      <CustomButton
        title="Créer le ticket"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});
