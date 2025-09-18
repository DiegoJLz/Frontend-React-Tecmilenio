'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterData } from '../../../types';
import { AuthService } from '../../../services';
import { Button, Input } from '../../ui';

interface RegisterFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegisterData>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    // Validar confirmación de contraseña
    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log('🚀 Enviando datos de registro:', formData);

      const user = await AuthService.register(formData);

      console.log('✅ Registro exitoso:', user);

      if (onSuccess) {
        onSuccess(user);
      } else {
        // Redirigir al dashboard o página principal
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('❌ Error en el registro:', error);

      const errorMessage = error.message || 'Error al crear la cuenta';

      if (onError) {
        onError(errorMessage);
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error general */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {errors.general}
          </div>
        )}

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Nombre *"
              type="text"
              value={formData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              placeholder="Tu nombre"
              error={errors.first_name}
              disabled={loading}
            />
          </div>

          <div>
            <Input
              label="Apellido *"
              type="text"
              value={formData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              placeholder="Tu apellido"
              error={errors.last_name}
              disabled={loading}
            />
          </div>
        </div>

        {/* Teléfono */}
        <Input
          label="Teléfono *"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          error={errors.phone}
          disabled={loading}
        />

        {/* Email */}
        <Input
          label="Email *"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="tu@email.com"
          error={errors.email}
          disabled={loading}
        />

        {/* Contraseña */}
        <div>
          <Input
            label="Contraseña *"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Mínimo 8 caracteres"
            error={errors.password}
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Debe contener al menos una mayúscula, una minúscula y un número
          </p>
        </div>

        {/* Confirmar Contraseña */}
        <Input
          label="Confirmar Contraseña *"
          type="password"
          value={formData.confirm_password}
          onChange={(e) => handleInputChange('confirm_password', e.target.value)}
          placeholder="Repite tu contraseña"
          error={errors.confirm_password}
          disabled={loading}
        />

        {/* Botón de envío */}
        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          className="w-full"
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>

        {/* Enlaces adicionales */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}