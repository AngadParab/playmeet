import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Mail,
  Lock,
  User,
  AtSign,
  ArrowRight,
  AlertCircle,
  Users,
  Activity,
  Shield,
  Loader2
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import ModernInput from "@/components/ModernInput"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { defaultRegisterValues, registerSchema } from "@/schemas/authSchema"

// Compact Password Strength Component
const PasswordStrength = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ]

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    }
  }

  const passwordStrength = getPasswordStrength(password)

  if (!password) return null

  return (
    <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300 w-full px-1">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-300", passwordStrength.color)}
            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-[10px] uppercase font-bold text-muted-foreground w-16 text-right">
          {passwordStrength.label}
        </span>
      </div>
    </div>
  )
}

const Register = () => {
  const { user, register: registerUser, loading, authError } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterValues
  })

  const watchPassword = form.watch("password")

  useEffect(() => {
    if (user) {
      navigate("/mode-selection")
    }
  }, [user, navigate])

  useEffect(() => {
    document.title = "Join PLAYMEET - Create Account"
  }, [])

  const onSubmit = async (data) => {
    if (!agreedToTerms) return

    try {
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.log("Registration error:", error?.message)
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
              Global Platform
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] font-heading">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Legacy.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-md leading-relaxed">
              Create an account and instantly connect with physical sports events and competitive esports tournaments.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-8">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xl mb-1">
                  <Activity className="w-5 h-5" /> 50K+
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Active Events</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xl mb-1">
                  <Users className="w-5 h-5" /> 2M+
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Athletes</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl mb-1">
                  <Shield className="w-5 h-5" /> 100%
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Secure</div>
              </div>
            </div>
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
            <h2 className="text-4xl font-black tracking-tight text-white mb-3">Join the Action</h2>
            <p className="text-gray-400 text-base">
              Create your profile and start competing today.
            </p>
          </div>

          {authError && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
              <Alert className="border-red-500/30 bg-red-500/10 backdrop-blur-md rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-400 font-semibold text-base mb-1">Registration Error</AlertTitle>
                <AlertDescription className="text-red-200/80 text-sm">
                  {authError}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ModernInput
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        error={form.formState.errors.name?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ModernInput
                        icon={AtSign}
                        type="text"
                        placeholder="Gamer Tag / Username"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        error={form.formState.errors.username?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                      <div className="space-y-2">
                        <ModernInput
                          icon={Lock}
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
                        <PasswordStrength password={watchPassword} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
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
                        error={form.formState.errors.confirmPassword?.message}
                        showPassword={showConfirmPassword}
                        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-start space-x-3 pt-2">
                <div className="relative flex items-center justify-center mt-1">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={setAgreedToTerms}
                    className="flex-shrink-0 border-white/20 data-[state=checked]:bg-primary"
                  />
                </div>
                <label htmlFor="terms" className="text-sm font-medium text-gray-400 leading-snug cursor-pointer select-none">
                  I agree to the <Link to="/terms" className="text-white hover:text-primary transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-white hover:text-primary transition-colors">Privacy Policy</Link>.
                </label>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || loading || !agreedToTerms}
                  className="w-full h-14 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5 transition-all duration-300 rounded-2xl group relative overflow-hidden border-0 disabled:opacity-50"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {form.formState.isSubmitting || loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Establish Profile</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-12 text-center lg:text-left text-sm pt-6 border-t border-white/10">
            <span className="text-gray-400 font-medium">Already have an account? </span>
            <Link
              to="/login"
              className="text-white font-bold hover:text-primary transition-colors inline-block ml-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
