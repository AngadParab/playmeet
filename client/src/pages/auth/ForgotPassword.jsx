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
  Send,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
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
      <div className="min-h-screen flex text-foreground bg-[#050505]">
        {/* Left Column - Hero */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[#050505]/80 to-purple-600/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-7000" />

          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-20 h-full text-white w-full">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <span className="text-3xl font-bold font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                PLAYMEET
              </span>
            </Link>

            <div className="space-y-8 max-w-xl animate-in slide-in-from-bottom-8 duration-1000 fade-in mb-12">
              <Badge variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-md px-5 py-2 text-sm font-mono uppercase tracking-widest rounded-full">
                Account Recovery
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] font-heading">
                Regain <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Access.</span>
              </h1>
              <p className="text-xl text-gray-400 font-medium max-w-md leading-relaxed">
                Don't let a forgotten password keep you from the action. Recover your account and get back in the game.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Success Form Pane */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative bg-[#050505] overflow-y-auto">
          {/* Subtle mobile background */}
          <div className="absolute inset-0 lg:hidden pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#050505]/80" />
          </div>

          <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700 text-center py-12">

            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-3xl font-black text-white px-2">Check your email</h3>
              <p className="text-gray-400 text-base">
                We've sent a 6-digit reset code to your email.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-left mb-8">
              <div className="flex items-center space-x-3 text-sm text-white">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-semibold text-base">{form.getValues("email")}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Link to="/reset-password">
                <Button className="w-full h-14 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5 transition-all duration-300 rounded-2xl border-0">
                  <div className="flex items-center justify-center space-x-2">
                    <KeyRound className="w-5 h-5" />
                    <span>Enter Reset Code</span>
                  </div>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full h-14 border-white/20 text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl font-semibold bg-transparent transition-colors"
                onClick={() => setSuccess(false)}
              >
                Try with a different email
              </Button>
            </div>

            <div className="mt-12 text-center text-sm pt-6 border-t border-white/10">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex text-foreground bg-[#050505]">
      {/* Left Column - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[#050505]/80 to-purple-600/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-7000" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-20 h-full text-white w-full">
          <Link to="/" className="flex items-center gap-3 w-fit group">

            <span className="text-3xl font-bold font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              PLAYMEET
            </span>
          </Link>

          <div className="space-y-8 max-w-xl animate-in slide-in-from-bottom-8 duration-1000 fade-in mb-12">
            <Badge variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-md px-5 py-2 text-sm font-mono uppercase tracking-widest rounded-full">
              Account Recovery
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] font-heading">
              Regain <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Access.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-md leading-relaxed">
              Don't let a forgotten password keep you from the action. Recover your account and get back in the game.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative bg-[#050505] overflow-y-auto">
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#050505]/80" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700 py-12">

          <div className="text-center lg:text-left mb-10">


            <h2 className="text-4xl font-black tracking-tight text-white mb-3">Reset Password</h2>
            <p className="text-gray-400 text-base">
              We'll send you instructions to reset your password.
            </p>
          </div>

          {error && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
              <Alert className="border-red-500/30 bg-red-500/10 backdrop-blur-md rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-400 font-semibold text-base mb-1">Error</AlertTitle>
                <AlertDescription className="text-red-200/80 text-sm">
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

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5 transition-all duration-300 rounded-2xl group relative overflow-hidden border-0"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Code</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-12 text-center lg:text-left text-sm pt-6 border-t border-white/10">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
