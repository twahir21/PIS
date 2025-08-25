// File: src/components/admin-panel.tsx
import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { useActivity, useBuses, useCreateBuses, useCreateUsers, useDeleteBuses, useDeleteUsers, useOverview, useUpdateBuses, useusernameRole, useUsers } from '../plugin';
import { capitalizeFirst, formatDateTime, getActivityColor, getBusTypeColor, getRoleColors, timeAgo } from '~/helpers/admin.helper';
import styles from "~/admin.css?inline";

export default component$(() => {
  const formModalOpen = useSignal(false);
  const deleteModal = useSignal(false);
  const deleteUserId = useSignal("--");
  const deleteBusId = useSignal("--");
  const deleteUsername = useSignal("this user");
  const deleteBusName = useSignal("this bus");
  const formTitle = useSignal('Add New Bus');
  const editIndex = useSignal(-1);
  const passwordVisible = useSignal(false);
  const isUser = useSignal(true);
  const isEdit = useSignal(false);

  
  
  // for data
  const selectedBus = useSignal<{
    id: string;
    plateNumber: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    station: string;
    type: string;
    status: string;
    delayMinutes: number;
    delayHours: number
  } | null>(null);  
  
  // inline css
  useStyles$(styles);
  
  
  // 1. define Datas from routeLoaders
  const overViewData = useOverview();
  const activity = useActivity();
  const usersData = useUsers();
  const buses = useBuses();

  // add new signal at top with others
  const selectedStatus = useSignal(selectedBus.value?.status || "ontime");

  // Form handling functions
  const openForm = $((edit = false, index = -1) => {
    formModalOpen.value = true;
    if (!edit) {
      formTitle.value = "Add New Bus";
      editIndex.value = -1;
    } else {
      formTitle.value = "Edit Bus";
      editIndex.value = index;
      selectedBus.value = buses.value.data[index];
    }
  });

  const closeForm = $(() => {
    formModalOpen.value = false;
  });

    const togglePasswordVisibility = $(() => {
        passwordVisible.value = !passwordVisible.value;
    });


  // post data
  const createAssistant = useCreateUsers();
  const deleteUser = useDeleteUsers();
  const deleteBus = useDeleteBuses();
  const usernameRole = useusernameRole();
  const createBuses = useCreateBuses();
  const updateBus = useUpdateBuses();


  return (
    <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center p-4 md:p-6 max-w-screen">
      {/* Main Container */}
      <div class="w-full max-w-7xl space-y-8">
        
        {/* Header */}
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700 pb-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-yellow-400 tracking-tight">Admin Dashboard</h1>
            <p class="text-lg text-gray-400 mt-1">Welcome back, <span class="text-green-400 font-medium">{capitalizeFirst(usernameRole.value.username!)}</span></p>
          </div>
          <div class="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg">
            <div class="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <span class="text-sm font-medium">{capitalizeFirst(usernameRole.value.role!)}</span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Stats */}
          <div class="bg-gray-800 rounded-xl p-6 card-hover">
            <h2 class="text-lg font-semibold text-yellow-300 mb-4">System Overview</h2>
            <div class="space-y-4">
              {/* Active Buses */}
              <div class="flex justify-between items-center pb-4 border-b border-gray-700">
                <span class="text-gray-400">Active Buses</span>
                <span class="text-xl font-bold">{overViewData.value.data.totalBuses}</span>
              </div>

              {/* Total ontime Buses */}
              <div class="flex justify-between items-center pb-4 border-b border-gray-700">
                <span class="text-gray-400">On-time Buses</span>
                <span class="text-xl font-bold">{overViewData.value.data.totalBusOntime}</span>
              </div>

              {/* Total delayed Buses */}
              <div class="flex justify-between items-center pb-4 border-b border-gray-700">
                <span class="text-gray-400">Delayed Buses</span>
                <span class="text-xl font-bold">{overViewData.value.data.totalBusDelayed}</span>
              </div>
          
              {/* Total Assistants */}
              <div class="flex justify-between items-center pb-4 border-b border-gray-700">
                <span class="text-gray-400">Assistants</span>
                <span class="text-xl font-bold">{overViewData.value.data.totalAssistants}</span>
              </div>
          
              {/* Total Operators */}
              <div class="flex justify-between items-center pb-4 border-b border-gray-700">
                <span class="text-gray-400">Operators</span>
                <span class="text-xl font-bold">{overViewData.value.data.totalOperators}</span>
              </div>
            </div>
          </div>

          {/* Create Assistant Card */}
          <div class="bg-gray-800 rounded-xl p-6 card-hover">
            <h2 class="text-lg font-semibold text-yellow-300 mb-4">Create Assistant</h2>
            <Form class="space-y-4" action={createAssistant}>
                <label class="block mb-2 text-sm font-medium text-gray-400">Username:</label>
               <div class="relative">
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  class="input-field w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:border-yellow-400 transition" 
                  placeholder="John Doe"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user-circle text-gray-400"></i>
                </div>
              </div>

              <label class="block mb-2 text-sm font-medium text-gray-400">Password: </label>
              <div class="relative">
                <input 
                  type={passwordVisible.value ? "text" : "password"}
                  id="password" 
                  name="password"
                  class="input-field w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:border-yellow-400 transition" 
                  placeholder="* * * * * * * *"
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
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-400">Role</label>
                <select class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-300"
                name="role">
                  <option class="bg-gray-800" value="assistant">Assistant</option>
                  <option class="bg-gray-800" value="operator">Operator</option>
                </select>
              </div>
              <button type="submit"
                class="w-full btn-primary bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 px-4 rounded-lg shadow transition flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
                Create Assistant
              </button>
              <p>{createAssistant.value?.message}</p>
            </Form>
          </div>

          {/* Recent Activities  */}
          <div class="bg-gray-800 rounded-xl p-6 card-hover">
            <h2 class="text-lg font-semibold text-yellow-300 mb-4">Recent Activity</h2>
            <div class="space-y-4">
              {activity.value.data.length > 0 ? (activity.value.data.map((activity) => (
                <div key={activity.id} class="flex items-start gap-3">
                  <div class={`mt-1 flex-shrink-0 h-2 w-2 rounded-full ${getActivityColor(activity.type)}`}></div>
                  <div>
                    <p class="text-sm font-medium">{activity.activity}</p>
                    <p class="text-xs text-gray-400">
                      {activity.description} - {timeAgo(new Date(activity.createdAt))}
                    </p>
                  </div>
                </div>
              ))): (
                <p class="text-sm text-gray-400">😴 No activity found</p>
              )}
            </div>
          </div>
        </div>

        {/* Bus Schedule Section */}
        <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b border-gray-700">
            <h2 class="text-xl font-semibold text-yellow-300">Bus Schedule Control</h2>
            <div class="flex gap-3 w-full md:w-auto">
              <button onClick$={() => {
                openForm(false);
                isEdit.value = false;
                }} class="btn-primary bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add New Bus
              </button>
              <button class="btn-primary bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Export
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead class="bg-gray-700">
                <tr>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Plate No.</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Route</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Schedule</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Status</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Type</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Station</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                {buses.value.data.length > 0 ? buses.value.data.map((bus, index) => (
                  <tr key={index} class="hover:bg-gray-750 transition">
                    <td class="p-4 font-medium">{bus.plateNumber}</td>
                    <td class="p-4">
                      <div class="flex items-center gap-2">
                        <span>{bus.from}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span>{bus.to}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex flex-col">
                        <span>{bus.departure} - {bus.arrival}</span>
                        <span class="text-xs text-gray-400">Daily</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <span class={`${bus.status === 'ontime' ? 'status-on-time' : bus.status === 'delayed' ? 'status-delayed' : 'status-cancelled'} font-semibold`}>
                        {bus.status} {bus.delayHours || bus.delayMinutes ? ` (${bus.delayHours === 0 ? `` : `${bus.delayHours}h `} ${bus.delayMinutes}m left)` : ''}
                      </span>
                    </td>
                    <td class="p-4">
                      <span class={`px-2 py-1 text-xs rounded-xl ${getBusTypeColor(bus.type)} font-bold`}>{bus.type === 'vip' ? "VIP" : capitalizeFirst(bus.type)}</span>
                    </td>
                    <td class="p-4"><i class="fas fa-map-marker-alt text-gray-400 pr-2"></i>{capitalizeFirst(bus.station)}</td>
                    <td class="p-4">
                      <div class="flex gap-2">
                        <button onClick$={() => {
                          openForm(true, index);
                          isEdit.value = true;
                          }} class="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick$={() => {
                            deleteModal.value = true;
                            isUser.value = false;
                            deleteBusName.value = bus.plateNumber;
                            deleteBusId.value = bus.id;
                          }} 
                          class="btn-primary bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} class="p-4 text-center text-gray-400">🚫 No buses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Bus create and update */}
        {formModalOpen.value && (
          <div class="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4 min-h-screen">
            <div class="bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-yellow-300">{formTitle.value}</h2>
                <button onClick$={closeForm} class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Form class="space-y-4" action={isEdit.value ? updateBus : createBuses}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input type="hidden"
                      name="id"
                      value={isEdit.value ? selectedBus.value?.id : ""}
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"  
                    />
                    <label class="block mb-2 text-sm font-medium text-gray-400">Plate No.</label>
                    <input 
                      name="plateNumber"
                      defaultValue={isEdit.value ? selectedBus.value?.plateNumber: ""} 
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent" 
                      placeholder="T 123 ABC" 
                      required 
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">Type</label>
                    <select 
                      name="type"
                      value={isEdit.value ? selectedBus.value?.type : "express"}
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option class="bg-gray-800" value="express">Express</option>                      
                      <option class="bg-gray-800" value="vip">VIP</option>
                      <option class="bg-gray-800" value="normal">Normal</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">From</label>
                    <select 
                      name="from" 
                      value={isEdit.value ? selectedBus.value?.from : "Dar Es Salaam"}
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option class="bg-gray-800" value="Dar Es Salaam">Dar Es Salaam</option>                      
                      <option class="bg-gray-800" value="Iringa">Iringa</option>
                      <option class="bg-gray-800" value="Singida">Singida</option>
                      <option class="bg-gray-800" value="Dodoma">Dodoma</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">To</label>
                    <select 
                      name="to" 
                      value={isEdit.value ? selectedBus.value?.to : "Dar Es Salaam"}
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option class="bg-gray-800" value="Iringa">Iringa</option>
                      <option class="bg-gray-800" value="Dar Es Salaam">Dar Es Salaam</option>                      
                      <option class="bg-gray-800" value="Singida">Singida</option>
                      <option class="bg-gray-800" value="Dodoma">Dodoma</option>
                    </select>          
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">Departure</label>
                    <input 
                      type="time" 
                      name="departure"
                      defaultValue={isEdit.value ? selectedBus.value?.departure : ""} 
                      class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent" 
                      required 
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">Arrival</label>
                    <input 
                      type="time"
                      defaultValue={isEdit.value ? selectedBus.value?.arrival : ""} 
                      name="arrival" class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <div>
                      <label class="block mb-2 text-sm font-medium text-gray-400">Status</label>
                      <select 
                        name="status" 
                        value={selectedStatus.value}
                        onChange$={(e) => (selectedStatus.value = (e.target as HTMLSelectElement).value)}
                        class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option class="bg-gray-800" value="ontime">On Time</option>
                        <option class="bg-gray-800" value="delayed">Delayed</option>
                        <option class="bg-gray-800" value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Extra inputs if delayed */}
                    {selectedStatus.value === "delayed" && (
                      <div class="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <label class="block mb-2 text-sm font-medium text-gray-400">Delay Hours</label>
                          <input 
                            type="number" 
                            name="delayHours"
                            min="0"
                            defaultValue={isEdit.value ? selectedBus.value?.delayHours.toString() : "0"}
                            value="0"
                            class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 
                                  focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            placeholder="e.g. 1"
                          />
                        </div>
                        <div>
                          <label class="block mb-2 text-sm font-medium text-gray-400">Delay Minutes</label>
                          <input 
                            type="number" 
                            name="delayMinutes"
                            min="0"
                            defaultValue={isEdit.value ? selectedBus.value?.delayMinutes.toString() : "0"}
                            max="59"
                            class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 
                                  focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            placeholder="e.g. 30"
                          />
                        </div>
                      </div>
                    )}

                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-400">Station</label>
                  <select 
                    name="station" 
                    value={isEdit.value ? selectedBus.value?.station : "manzese"}
                    class="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option class="bg-gray-800" value="manzese">Manzese</option>
                  </select>                  
                </div>
                <div class="flex justify-end gap-3 pt-2">
                  <button type="button" onClick$={closeForm} class="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium">Cancel</button>
                  <button type="submit" class="px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Save Bus
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* Assistants Management */}
        <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b border-gray-700">
            <h2 class="text-xl font-semibold text-yellow-300">Assistants Management</h2>
            <div class="relative w-full md:w-64">
              <input type="text" placeholder="Search assistants..." class="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-500"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead class="bg-gray-700">
                <tr>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Username</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Role</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Last Active</th>
                  <th class="p-4 text-left text-sm font-medium text-yellow-300">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                {(usersData.value.data.length > 0) ? (usersData.value.data.map((assistant, index) => (
                  <tr key={index} class="hover:bg-gray-750 transition">
                    <td class="p-4 font-medium">{assistant.username}</td>
                    <td class="p-4">
                      <span class={`${getRoleColors(assistant.role)} px-2.5 py-1 rounded-full text-xs font-medium`}>{assistant.role}</span>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center gap-2">
                        {/* Last Active is whenever the req is auth of the user */}
                        <span>{formatDateTime(assistant.lastActive)}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex gap-4">
                        <button 
                          onClick$={() => {
                            deleteModal.value = true;
                            isUser.value = true;
                            deleteUserId.value = assistant.id;
                            deleteUsername.value = assistant.username;
                          }} 
                          class="btn-primary bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan={4} class="p-4 text-center text-gray-400">
                      No assistants found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Modal */}
        {deleteModal.value  && (
          <div class="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4 min-h-screen">
            <div class="bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-yellow-300">Delete {isUser.value ? "User" : "Bus"}</h2>
                <button onClick$={() => (deleteModal.value = false)} class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Form class="space-y-4" action={isUser.value ? deleteUser : deleteBus }>
                <input type="hidden" name="deleteId" value={isUser.value ? deleteUserId.value : deleteBusId.value} />
                <p>Are you sure you want to delete {isUser.value ? deleteUsername.value : deleteBusName.value}?</p>

                <div class="flex justify-end gap-3 pt-2">
                  <button type="button" 
                    onClick$={() => {
                      deleteModal.value = false;
                    }} 
                    class="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium">Cancel</button>
                        
                    <button 
                      type="submit"
                      class="btn-primary bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Delete
                    </button>
                </div>
              </Form>
            </div>
          </div>
        )}        

        {/* Footer */}
        <footer class="mt-8 text-center text-gray-500 text-sm pb-6">
          © 2025 Passenger Information System. All rights reserved.
        </footer>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Admin Panel | Passenger Information System",
  meta: [
    {
      name: "robots",
      content: "noindex, nofollow", // ensures search engines don't index it
    },
    {
      name: "description",
      content: "Secure admin dashboard for managing buses, assistants, and schedules in the Passenger Information System.",
    },
  ],
};
