import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { useBuses, useOverview } from "./plugin";
import { clientLink } from "~/const/links.const";
import { capitalizeFirst } from "~/helpers/admin.helper";
import { publicEmojis, publicStatus, publicType, statusEnglish, statusSwahili } from "~/helpers/public.helper";

export default component$(() => {
  // 1. define Datas from routeLoaders
  const overViewData = useOverview();
  const buses = useBuses();
  const currentTime = useSignal<string>("--:--:--");
  const language = useSignal<"en" | "sw">("en"); // <-- active language

  useVisibleTask$(() => {
    const updateTime = () => {
      const now = new Date();

      // Format time (HH:MM:SS 24h)
      const time = now.toLocaleTimeString("en-GB", {
        hour12: false,
      });

      // Format date (Day, DD Mon YYYY)
      const date = now.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      currentTime.value = `${time} • ${date}`;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  });

  // switch language every 15 seconds
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      language.value = language.value === "en" ? "sw" : "en";
    }, 18000);
    return () => clearInterval(interval);
  });

  return (
    <>
    <div class="bg-gray-900 text-white font-sans min-h-screen flex flex-col items-center p-4">
      
      {/* <!-- Header with improved layout --> */}
      <header class="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center border-b border-yellow-400/30 pb-4 mb-6">
        <div class="mb-4 md:mb-0">
          <a href={`${clientLink}/admin`} target="_blank">
            <div class="flex items-center gap-3">
            <i class="fas fa-bus text-yellow-400 text-3xl"></i>
            <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-yellow-400">
                {language.value === "en" ? "BUS SCHEDULE" : "RATIBA YA BASI"}
            </h1>
          </div>
          </a>
          <p class="text-sm pt-2 text-gray-200 font-semibold flex items-center gap-2">
            <i class="fas fa-map-marker-alt text-yellow-400"></i>
              {language.value === "en"
              ? "ABC-Upperclass • Manzese Station"
              : "ABC-Upperclass • Kituo cha Manzese"}
          </p>
        </div>
        <div class="text-lg font-medium bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <i class="far fa-clock text-green-400"></i>
          <span>{language.value === "en" ? "Current Time:" : "Muda wa Sasa:"}</span> 
          <span id="currentTime" class="text-green-400 font-mono">{currentTime.value}</span>
        </div>
      </header>
      
      {/* <!-- Status Summary Cards --> */}
      <div class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
          <div class="flex justify-between items-center">
            <span class="text-gray-300">{language.value === "en" ? "Total Buses On Time" : "Jumla ya mabasi yaliyofika kwa wakati"}</span>
            <span class="text-green-400 text-2xl font-bold">{overViewData.value.data.totalBusOntime}</span>
          </div>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
          <div class="flex justify-between items-center">
            <span class="text-gray-300">{language.value === "en" ? "Total Buses Delayed" : "Jumla ya mabasi yaliyochelewa"}</span>
            <span class="text-yellow-400 text-2xl font-bold">{overViewData.value.data.totalBusDelayed}</span>
          </div>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
          <div class="flex justify-between items-center">
            <span class="text-gray-300">{language.value === "en" ? "Total Buses" : "Jumla ya mabasi"}</span>
            <span class="text-blue-400 text-2xl font-bold">{overViewData.value.data.totalBuses}</span>
          </div>
        </div>
      </div>
      
      {/* <!-- Bus Table --> */}
      <div class="w-full max-w-6xl bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 mb-6">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-gray-700 text-yellow-300">
              <tr>
                <th class="p-3 text-left min-w-[120px]">{language.value === "en" ? "Plate Number" : "Namba ya gari"}</th>
                <th class="p-3 text-left min-w-[120px]">{language.value === "en" ? "From" : "Kutoka"}</th>
                <th class="p-3 text-left min-w-[120px]">{language.value === "en" ? "To" : "Kwenda"}</th>
                <th class="p-3 text-left min-w-[100px]">{language.value === "en" ? "Departure" : "Kuondoka"}</th>
                <th class="p-3 text-left min-w-[100px]">{language.value === "en" ? "Arrival" : "Kuwasili"}</th>
                <th class="p-3 text-left min-w-[150px]">{language.value === "en" ? "Status" : "Hali"}</th>
                <th class="p-3 text-left min-w-[100px]">{language.value === "en" ? "Type" : "Aina"}</th>
                <th class="p-3 text-left min-w-[120px]">{language.value === "en" ? "Station" : "Kituo"}</th>
              </tr>
            </thead>
            <tbody id="busTable" class="divide-y divide-gray-700">

              {buses.value.data.map((bus) => (
                <tr key={bus.id} class="hover:bg-gray-700/50 transition">
                  <td class="p-3 font-mono">{bus.plateNumber}</td>
                  <td class="p-3">{bus.from}</td>
                  <td class="p-3">{bus.to}</td>
                  <td class="p-3 font-medium">{bus.departure}</td>
                  <td class="p-3 font-medium">{bus.arrival}</td>
                  
                  {/* Status + Delay */}
                  <td class="p-3">
                    <span
                      class={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${publicStatus(bus.status)} font-bold`}
                    >
                      <i class={`fas pr-1 ${publicEmojis(bus.status)}`}></i>
                      {language.value === "en" ? statusEnglish(bus.status) : statusSwahili(bus.status)}
                      {(bus.delayHours !== 0 || bus.delayMinutes !== 0) && (
                        <>
                          {" ("}
                          {bus.delayHours !== 0 && `${bus.delayHours}h `}
                          {bus.delayMinutes !== 0 && `${bus.delayMinutes}m`}
                          {")"}
                        </>
                      )}
                    </span>
                  </td>

                  {/* Bus Type */}
                  <td class="p-3">
                    <span
                      class={`px-2 py-1 rounded ${publicType(bus.type)}text-xs font-bold`}
                    >
                      {bus.type === 'vip' ? "VIP" : capitalizeFirst(bus.type)}
                      
                    </span>
                  </td>

                  {/* Station */}
                  <td class="p-3">
                    <i class="fas fa-map-marker-alt text-gray-400 pr-2"></i>
                    {capitalizeFirst(bus.station)}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>



      {/* <!-- Next Departure Banner --> */}
      {/* <div class="w-full max-w-6xl mt-6 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-yellow-400/20 p-3 rounded-full">
            <i class="fas fa-bus text-yellow-400 text-2xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-yellow-400">Next Departure</h3>
            <p class="text-sm">T 578 DXN to Singida at <span class="font-bold">14:45</span></p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs text-gray-400">Kuondoka kijijini</div>
          <div class="font-mono text-lg">00:14:32</div>
        </div>
      </div> */}

      {/* <!-- Footer with additional info --> */}
      <footer class="mt-6 text-gray-400 text-sm w-full max-w-6xl border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <div class="mb-2 md:mb-0">
          {language.value === "en" ? "© 2025 Passenger Information System. All rights reserved." : "© 2025 Mfumo wa utoaji taarifa kwa Abiria. Haki zote zimehifadhiwa."}
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <i class="fas fa-phone-alt text-yellow-400"></i>
            <span>
              {language.value === "en" ? "Customer Service: " : "Huduma kwa Wateja: "}
              +255 123 456 789</span>
          </div>
        </div>
      </footer>

    </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Passenger Information System (PIS) | Real-time Bus Schedules - Manzese Station",
  meta: [
    {
      name: "description",
      content:
        "Passenger Information System (PIS) provides real-time bus schedules, departures, delays, and status updates for Manzese Station. Stay informed with the latest travel information.",
    },
    {
      name: "keywords",
      content:
        "Passenger Information System, PIS, bus schedules, Tanzania buses, Manzese station, Dar es Salaam buses, real-time departures, bus delays, transport info",
    },
    { name: "author", content: "Passenger Information System - Tanzania" },

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    { property: "og:title", content: "Passenger Information System - Manzese Station" },
    {
      property: "og:description",
      content:
        "Check live bus schedules, delays, and upcoming departures at Manzese Station with the Passenger Information System (PIS).",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://your-domain.com/pis" },
    { property: "og:image", content: "https://your-domain.com/og-image.jpg" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Passenger Information System - Live Bus Schedules" },
    {
      name: "twitter:description",
      content:
        "Stay updated with live bus schedules, statuses, and delays from Manzese Station.",
    },
    { name: "twitter:image", content: "https://your-domain.com/twitter-image.jpg" },
  ],
};
