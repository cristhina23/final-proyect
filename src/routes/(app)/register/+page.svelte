<script lang="ts">
  import salonBg from '$lib/assets/hero3.png';

  // function to handle register
  const handleRegister = async (e: Event) => {
    e.preventDefault()
    const data = {
      full_name: (e.target as HTMLFormElement).fullName.value,
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
      phone: (e.target as HTMLFormElement).phone.value,
    }
    const request = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const response = await request.json()
    console.log(response)
    if (response.success) {
      window.location.href = '/dashboard'
    }
  }

</script>

<div class="relative flex items-center justify-center min-h-screen py-12 px-4 overflow-hidden bg-background ">

  <div class="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#C8A180]/80 rounded-full blur-[100px] pointer-events-none"></div>

  <div class="absolute -bottom-20 -right-30 w-[500px] h-[500px] bg-[#D9B79A]/80 rounded-full blur-[100px] pointer-events-none"></div>

 
  <div class="relative z-10 flex flex-col md:flex-row  max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px] border border-secondary">
    
    
    <div class="hidden md:flex flex-1 relative bg-cover bg-center bg-primary">
      
      <img src={salonBg} class="transform scale-x-[-1]" alt="salon" />


      <div class="absolute inset-0 bg-black/20 "></div>
      
     
      
    </div>

    
    <div class="flex-1 flex flex-col justify-center p-8 md:p-16 ">
      <div class="w-full max-w-md mx-auto">
        <h2 class="text-3xl font-bold text-[#4A2F1F] mb-2">Create Your Account</h2>
        <p class="text-gray-500 mb-8 font-medium">
          Join our community and enjoy exclusive benefits.
        </p>

        <form class="space-y-4" on:submit|preventDefault={handleRegister}>
          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Full Name</span>
            <input
              type="text"
              placeholder="Jane Doe"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              id="fullName"
              name="fullName"
              required
              min="6"
              max="30"
            />
          </div>

          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Email Address</span>
            <input
              type="email"
              placeholder="jane@example.com"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              id="email"
              name="email"
              required
              min="6"
              max="30"
            />
          </div>

          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Phone Number</span>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              id="phone"
              name="phone"
              required
              min="10"
              max="15"
            />
          </div>

          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              id="password"
              name="password"
              required
              min="8"
              max="30"
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-primary hover:bg-[#8B6A50] text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] mt-4"
          >
            Create Account
          </button>

          <p class="text-center text-gray-600 mt-6">
            Already have an account? 
            <a href="/login" class="text-[#9E7A5D] font-bold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
