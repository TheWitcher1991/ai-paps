'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const loginSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(1, 'Введите имя пользователя'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(1, 'Введите пароль'),
  ),
})

type LoginFormData = v.InferInput<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // TODO: Implement actual login
      console.log('Login:', data)
      router.push('/workspace')
    } catch (err) {
      setError('Неверное имя пользователя или пароль')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md px-4">
      <div className="rounded-lg border border-border bg-card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-foreground">PAPS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Intelligent Plant Automated Pest System
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Имя пользователя
            </label>
            <input
              type="text"
              {...register('username')}
              placeholder="Введите имя пользователя"
              className="h-9 rounded-md border border-input bg-input-background px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Введите пароль"
                className="h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Войти'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
