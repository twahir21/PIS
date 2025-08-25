// File: src/components/login-form.tsx
import { component$, useSignal, $, useStyles$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { useLogin } from '../plugin';
import styles from "~/auth.css?inline";


export default component$(() => {
  // inline css
  useStyles$(styles);
  const passwordVisible = useSignal(false);
  
  const togglePasswordVisibility = $(() => {
    passwordVisible.value = !passwordVisible.value;
  });

  // post data
  const login = useLogin();

  return (
    <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#394455] to-[#111827]">
      {/* Login Container */}
      <div class="w-full max-w-md">
        {/* Header Logo */}
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-3 mb-2">
            <i class="fas fa-bus text-yellow-400 text-4xl"></i>
            <h1 class="text-3xl font-bold tracking-wide text-yellow-400">
              BUS SCHEDULE   
            </h1>
          </div>
        </div>

        {/* Login Card */}
        <div class="login-card bg-gray-800/80 border border-yellow-400/30 rounded-xl p-8">
          <h2 class="text-3xl font-bold text-white mb-6 text-center">Sign In</h2>
          
          <Form action={login} class="space-y-6">
            {/* Username Field */}
            <div>
              <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-user text-yellow-400 mr-2"></i>Username
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  class="input-field w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:border-yellow-400 transition" 
                  placeholder="Enter your username"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user-circle text-gray-400"></i>
                </div>
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-lock text-yellow-400 mr-2"></i>Password
              </label>
              <div class="relative">
                <input 
                  type={passwordVisible.value ? "text" : "password"}
                  id="password" 
                  name="password"
                  class="input-field w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:border-yellow-400 transition" 
                  placeholder="Enter your password"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-key text-gray-400"></i>
                </div>
                <button 
                  type="button" 
                  onClick$={togglePasswordVisibility} 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i class={passwordVisible.value ? "fas fa-eye text-gray-400 hover:text-yellow-400" : "fas fa-eye-slash text-gray-400 hover:text-yellow-400"}></i>
                </button>
              </div>
            </div>
            
            
            {/* Submit Button */}
            <button 
              type="submit" 
              class="w-full text-xl bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-bold hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-gray-900 pt-3 mt-5 mb-5 pb-3"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>Sign In
            </button>
          </Form>
        </div>
        
        {/* Footer */}
        <div class="text-center mt-6 text-gray-400 text-sm">
          <p>© 2025 Passenger Information System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Login | Passenger Information System (PIS)',
  meta: [
    {
      name: 'description',
      content: 'Secure login page for the Passenger Information System. Enter your credentials to access bus schedules, trip management, and administrative tools.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow', // login pages usually shouldn't be indexed
    },
    {
      name: 'author',
      content: 'Passenger Information System',
    },
  ],
};
