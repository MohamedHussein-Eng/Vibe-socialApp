import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../../MainData';
import toast from 'react-hot-toast';

export default function Settings() {
  // 1. Initialize form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 2. Setup the API call
  const changePasswordMutation = useMutation({
    mutationFn: (data) => {
      // Replace with your actual backend endpoint
      return axios.patch(`${baseUrl}/users/change-password`, data,{
          headers: {
        "token": ` ${localStorage.getItem("token")}`
      }
      });
    },
    onSuccess: (response) => {
      // Assuming your API returns { token: '...' }
      console.log(response?.data);
      
      const newToken = response?.data?.data.token;
      console.log("old"+localStorage.getItem("token"));
      if (newToken) {
        
        
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        console.log("new:"+localStorage.getItem("token"));
        
      }
      
      toast.success(response?.data?.message)
      reset(); 
    },
    onError: (error) => {
    //   toast.error(error)
      
      console.log(error.name);
       console.log(error.cause);
      
    },
  });

  // 3. Triggered when the user clicks submit
  const onSubmit = (data) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <section className="w-full py-10">
      <div className=" mx-auto w-1/2">
        <div className="mb-8 text-center ">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Change Password</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Update your account security to keep your information safe.
          </p>
        </div>
        
        {/* Main Card */}
        <div className="bg-white 0 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8">
            {/* Attach handleSubmit here */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Current Password
                </label>
                <div className="relative group">
                  <input
                    // Added dynamic border color for errors
                    className={`w-full h-12 px-4 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20 focus:border-primary'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 outline-none transition-all pr-12`}
                    placeholder="Enter your current password"
                    type="password"
                    {...register('password', { required: 'Current password is required' })}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors" type="button"></button>
                </div>
                {/* Error Message Display */}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    className={`w-full h-12 px-4 rounded-lg border ${errors.newPassword ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20 focus:border-primary'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 outline-none transition-all pr-12`}
                    placeholder="Choose a strong password"
                    type="password"
                    {...register('newPassword', { 
                      required: 'New password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors" type="button"></button>
                </div>
                {/* Error Message Display */}
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                >
                  {/* Dynamic button text */}
                  {changePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
                </button>
                
                <button
                  className="w-full h-12 bg-transparent text-slate-500 dark:text-slate-400 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  type="button"
                  onClick={() => reset()} // Added reset functionality to Cancel
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">help_outline</span>
            Having trouble? <a className="text-primary font-semibold hover:underline" href="#">Contact Support</a>
          </p>
        </div>
      </div>
    </section>
  );
}