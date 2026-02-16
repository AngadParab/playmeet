import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  KeyRound,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Mail,
  Shield,
  Clock,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ModernInput from "@/components/ModernInput"
import api from "@/utils/api"
import { toast } from "react-hot-toast"

// Conditional schema based on step
const step1Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  resetCode: z.string().min(6, "Reset code must be 6 digits").max(6, "Reset code must be 6 digits"),
})

const step2Schema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [step, setStep] = useState(1) // 1: verify code, 2: set new password
  const [resetToken, setResetToken] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  // Step 1 form (email + reset code)
  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: "",
      resetCode: "",
    },
  })

  // Step 2 form (new password)
  const step2Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onVerifyCode = async (data) => {
    setVerifying(true)
    setError("")

    try {
      const response = await api.post("/auth/verify-reset-code", {
        email: data.email,
        resetCode: data.resetCode,
      })

      if (response.data.success) {
        setResetToken(response.data.data.resetToken)
        setStep(2)
        toast.success("Code verified! Now set your new password.")
      }
    } catch (err) {
      const message = err.response?.data?.message || "Invalid reset code"
      setError(message)
      toast.error(message)
    } finally {
      setVerifying(false)
    }
  }

  const onResetPassword = async (data) => {
    setLoading(true)
    setError("")

    try {
      const response = await api.post("/auth/reset-password", {
        resetToken,
        newPassword: data.newPassword,
      })

      if (response.data.success) {
        toast.success("Password reset successfully!")
        navigate("/login", {
          state: {
            message: "Password reset successfully. Please login with your new password.",
            type: "success"
          }
        })
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reset password"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 h-full flex w-full flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
          <Card className="border-border bg-card shadow-2xl shadow-black/5 rounded-3xl">
            <CardHeader className="pb-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-sm">
                    {step === 1 ? (
                      <KeyRound className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {step === 1 ? "Verify Reset Code" : "Set New Password"}
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {step === 1
                    ? "Enter the 6-digit code sent to your email"
                    : "Choose a strong password for your account"
                  }
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${step === 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-green-500 text-white'
                    }`}>
                    {step === 1 ? '1' : <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
                <div className={`h-0.5 w-8 transition-colors duration-300 ${step === 2 ? 'bg-green-500' : 'bg-secondary'}`} />
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${step === 2
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                    }`}>
                    2
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
              {error && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <Alert className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertTitle className="text-red-800 dark:text-red-200 font-semibold text-sm">
                      Error
                    </AlertTitle>
                    <AlertDescription className="text-red-700 dark:text-red-300 text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Step 1: Verify Code Form */}
              {step === 1 && (
                <Form {...step1Form}>
                  <form onSubmit={step1Form.handleSubmit(onVerifyCode)} className="space-y-6">
                    <FormField
                      control={step1Form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ModernInput
                              icon={Mail}
                              type="email"
                              placeholder="Email Address"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              error={step1Form.formState.errors.email?.message}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step1Form.control}
                      name="resetCode"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-sm font-medium text-foreground mb-2 block">
                            6-Digit Reset Code
                          </Label>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="000000"
                                maxLength={6}
                                {...field}
                                className="h-10 text-center text-2xl font-mono tracking-[0.5em] border-border focus:border-primary rounded-xl bg-background transition-all duration-300"
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                                  field.onChange(value)
                                }}
                              />
                            </div>
                          </FormControl>
                          {step1Form.formState.errors.resetCode && (
                            <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                              <AlertCircle className="w-4 h-4" />
                              <span>{step1Form.formState.errors.resetCode.message}</span>
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={verifying}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                    >
                      <div className="flex items-center justify-center">
                        {verifying ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying Code...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <KeyRound className="w-4 h-4" />
                            <span>Verify Code</span>
                          </div>
                        )}
                      </div>
                    </Button>

                    <div className="text-center pt-4 border-t border-border">
                      <Link
                        to="/login"
                        className="text-sm text-primary hover:underline font-medium transition-colors inline-flex items-center"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Login
                      </Link>
                    </div>
                  </form>
                </Form>
              )}

              {/* Step 2: New Password Form */}
              {step === 2 && (
                <Form {...step2Form}>
                  <form onSubmit={step2Form.handleSubmit(onResetPassword)} className="space-y-6">
                    <FormField
                      control={step2Form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ModernInput
                              icon={Lock}
                              type="password"
                              placeholder="New Password"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              error={step2Form.formState.errors.newPassword?.message}
                              showPassword={showPassword}
                              onTogglePassword={() => setShowPassword(!showPassword)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ModernInput
                              icon={Lock}
                              type="password"
                              placeholder="Confirm Password"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              error={step2Form.formState.errors.confirmPassword?.message}
                              showPassword={showConfirmPassword}
                              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                      <div className="flex items-center space-x-2 text-sm text-foreground">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Password Requirements</span>
                      </div>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• At least 6 characters long</li>
                        <li>• Include letters and numbers</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                    >
                      <div className="flex items-center justify-center">
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Resetting Password...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>Reset Password</span>
                          </div>
                        )}
                      </div>
                    </Button>

                    <div className="text-center pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors inline-flex items-center"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Change Code
                      </button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
