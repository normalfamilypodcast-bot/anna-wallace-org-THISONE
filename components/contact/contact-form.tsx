'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type FormData = {
  name: string;
  email: string;
  phone: string;
  contactType: string;
  message: string;
};

type Status =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    contactType: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactType: '',
          message: '',
        });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.name.split(' ')[0] || ''}
              onChange={(e) => {
                const lastName = formData.name.split(' ').slice(1).join(' ');
                setFormData({
                  ...formData,
                  name: `${e.target.value} ${lastName}`.trim(),
                });
              }}
              required
              placeholder="Enter your first name"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.name.split(' ').slice(1).join(' ') || ''}
              onChange={(e) => {
                const firstName = formData.name.split(' ')[0] || '';
                setFormData({
                  ...formData,
                  name: `${firstName} ${e.target.value}`.trim(),
                });
              }}
              required
              placeholder="Enter your last name"
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="Enter your email"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter your phone number"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactType">Contact Type</Label>
          <Select
            value={formData.contactType}
            onValueChange={(value) =>
              setFormData({ ...formData, contactType: value })
            }
            required
          >
            <SelectTrigger id="contactType" className="bg-background">
              <SelectValue placeholder="Select a contact type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Media inquiry">Media inquiry</SelectItem>
              <SelectItem value="Speaker request">Speaker request</SelectItem>
              <SelectItem value="Sponsorship or partnership">
                Sponsorship or partnership
              </SelectItem>
              <SelectItem value="Coaching inquiry">Coaching inquiry</SelectItem>
              <SelectItem value="Register for event">Register for event</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            placeholder="Tell me more about your inquiry..."
            rows={6}
            className="bg-background resize-none"
          />
        </div>

        {status.message && (
          <div
            className={`p-4 rounded-md ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : status.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : ''
            }`}
          >
            {status.message}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status.type === 'loading'}
          className="w-full"
        >
          {status.type === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};
