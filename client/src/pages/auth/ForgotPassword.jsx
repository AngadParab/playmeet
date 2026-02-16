import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  KeyRound,
  Shield,
  Clock,
  Trophy,
  Send,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import ModernInput from "@/components/ModernInput"
import api from "@/utils/api"
import { toast } from "react-hot-toast"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError("")

    try {
      const response = await api.post("/auth/forgot-password", {
        email: data.email,
      })

      if (response.data.success) {
        setSuccess(true)
        toast.success("Reset code sent to your email!")
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send reset code"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="h-screen bg-background relative overflow-hidden">
        <div className="relative z-10 h-full flex w-full flex items-center justify-center p-6">
          <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
            <Card className="border-border bg-card shadow-2xl shadow-black/5 rounded-3xl">
              <CardHeader className="pb-6 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    Check Your Email
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    We've sent a 6-digit reset code to your email
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                {/* Email Display */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                    <div className="flex items-center space-x-2 text-sm text-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Email Sent</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sent to <span className="font-semibold">{form.getValues("email")}</span>. Check your spam folder if you don't see it.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/reset-password">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                      <div className="flex items-center justify-center space-x-2">
                        <KeyRound className="w-4 h-4" />
                        <span>Enter Reset Code</span>
                      </div>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl"
                    onClick={() => setSuccess(false)}
                  >
                    try with a different email
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:underline font-medium transition-colors inline-flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
                    <KeyRound className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  Forgot Password?
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Enter your email address and we'll send you a reset code
                </p>
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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
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
                            error={form.formState.errors.email?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                  >
                    <div className="flex items-center justify-center">
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Reset Code...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Send Reset Code</span>
                        </div>
                      )}
                    </div>
                  </Button>
                </form>
              </Form>

              <div className="text-center pt-4 border-t border-border">
                <Link
                  to="/login"
                  className="text-sm text-primary hover:underline font-medium transition-colors inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
