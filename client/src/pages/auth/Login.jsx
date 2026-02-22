import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Mail,
  ArrowRight,
  AlertCircle,
  Shield,
  KeyRound,
  Loader2,
  Users,
  Activity
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import ModernInput from "@/components/ModernInput"
import { loginSchema, defaultLoginValues } from "@/schemas/authSchema"

const Login = () => {
  const { user, login, loading, authError } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues
  })

  useEffect(() => {
    if (user) {
      navigate("/mode-selection")
    }
  }, [user, navigate])

  useEffect(() => {
    document.title = "Sign In - PLAYMEET"
  }, [])

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.log("Login error:", error?.message)
    }
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
              Authentication
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] font-heading">
              Return to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Glory.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-md leading-relaxed">
              Log in to reconnect with your team, manage your tournaments, and dominate the leaderboards.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative bg-[#050505] overflow-y-auto">
        {/* Subtle mobile background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#050505]/80" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700 py-12">

          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <span className="text-3xl font-bold font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                PLAYMEET
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-white mb-3">Sign In</h2>
            <p className="text-gray-400 text-base">
              Enter your configuration details to proceed.
            </p>
          </div>

          {authError && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
              <Alert className="border-red-500/30 bg-red-500/10 backdrop-blur-md rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-400 font-semibold text-base mb-1">Authentication Error</AlertTitle>
                <AlertDescription className="text-red-200/80 text-sm">
                  {authError}
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ModernInput
                        icon={KeyRound}
                        type="password"
                        placeholder="Password"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        error={form.formState.errors.password?.message}
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" id="remember" className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-white/5 checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <label htmlFor="remember" className="text-sm font-medium text-gray-400 cursor-pointer select-none hover:text-white transition-colors">Remember me</label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || loading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5 transition-all duration-300 rounded-2xl group relative overflow-hidden border-0"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {form.formState.isSubmitting || loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-12 text-center lg:text-left text-sm pt-6 border-t border-white/10">
            <span className="text-gray-400 font-medium">New to PLAYMEET? </span>
            <Link
              to="/register"
              className="text-white font-bold hover:text-primary transition-colors inline-block ml-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
