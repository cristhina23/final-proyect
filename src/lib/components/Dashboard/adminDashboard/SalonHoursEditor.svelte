<script lang="ts">
  import { onMount } from 'svelte';
  import { X, Save, Clock, Calendar } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  let { 
    open = $bindable(false),
    onsuccess = () => {}
  } = $props<{ open: boolean, onsuccess?: () => void }>();

  let hours = $state([
    { day_of_week: 1, day: 'Monday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 2, day: 'Tuesday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 3, day: 'Wednesday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 4, day: 'Thursday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 5, day: 'Friday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 6, day: 'Saturday', open_time: '09:00', close_time: '18:00', isOpen: true },
    { day_of_week: 0, day: 'Sunday', open_time: '09:00', close_time: '18:00', isOpen: false },
  ]);

  let loading = $state(false);
  let saving = $state(false);
  let message = $state({ text: '', type: '' });

  async function fetchHours() {
    loading = true;
    try {
      const res = await fetch('/api/admin/salon-hours');
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          // Map DB data to our state
          hours = hours.map(h => {
            const dbDay = data.find((d: any) => d.day_of_week === h.day_of_week);
            if (dbDay) {
              return { 
                ...h, 
                open_time: dbDay.open_time, 
                close_time: dbDay.close_time, 
                isOpen: dbDay.is_open 
              };
            }
            return { ...h, isOpen: false };
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function save() {
    saving = true;
    message = { text: '', type: '' };
    try {
      const dataToSave = hours.map(({ day_of_week, open_time, close_time, isOpen }) => ({ 
        day_of_week, 
        open_time, 
        close_time,
        is_open: isOpen
      }));

      const res = await fetch('/api/admin/salon-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours: dataToSave })
      });

      if (res.ok) {
        message = { text: 'Schedule saved successfully!', type: 'success' };
        onsuccess();
        setTimeout(() => { 
          if (message.text) message = { text: '', type: '' };
        }, 3000);
      } else {
        message = { text: 'Error saving schedule', type: 'error' };
      }
    } catch (err) {
      message = { text: 'Network error', type: 'error' };
    } finally {
      saving = false;
    }
  }

  onMount(fetchHours);
</script>

{#if open}
  <div class="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
      <!-- Header -->
      <div class="bg-brown p-6 text-white flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="bg-white/20 p-2 rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <h2 class="text-xl font-bold">Salon Operating Hours</h2>
            <p class="text-white/70 text-xs">Set when your salon is open for clients</p>
          </div>
        </div>
        <button onclick={() => open = false} class="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <!-- Content -->
      <div class="p-8 max-h-[70vh] overflow-y-auto">
        {#if loading}
          <div class="flex flex-col items-center justify-center py-12 gap-3">
             <div class="w-8 h-8 border-4 border-brown/30 border-t-brown rounded-full animate-spin"></div>
             <p class="text-sm text-muted-foreground italic">Loading schedule...</p>
          </div>
        {:else}
          <div class="space-y-4">
            {#each hours as day}
              <div class="flex items-center justify-between p-4 rounded-2xl border {day.isOpen ? 'border-brown/20 bg-brown/5' : 'border-gray-100 bg-gray-50/50'} transition-all">
                <div class="flex items-center gap-4 min-w-[140px]">
                  <input 
                    type="checkbox" 
                    bind:checked={day.isOpen}
                    id="day-{day.day_of_week}"
                    class="w-5 h-5 rounded border-gray-300 text-brown focus:ring-brown cursor-pointer"
                  />
                  <label for="day-{day.day_of_week}" class="font-bold text-sm {day.isOpen ? 'text-brown' : 'text-gray-400'} cursor-pointer">
                    {day.day}
                  </label>
                </div>

                {#if day.isOpen}
                  <div class="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                    <div class="relative">
                      <input 
                        type="time" 
                        bind:value={day.open_time}
                        class="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brown/20 outline-none w-32"
                      />
                    </div>
                    <span class="text-gray-400">to</span>
                    <div class="relative">
                      <input 
                        type="time" 
                        bind:value={day.close_time}
                        class="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brown/20 outline-none w-32"
                      />
                    </div>
                  </div>
                {:else}
                  <span class="text-xs font-medium text-gray-400 italic">Currently Closed</span>
                {/if}
              </div>
            {/each}
          </div>
        {/if}

        {#if message.text}
          <div class="mt-6 p-4 rounded-xl text-sm font-medium animate-in slide-in-from-bottom-2
            {message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}">
            {message.text}
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="p-6 border-t bg-gray-50 flex justify-end gap-3">
        <Button variant="ghost" onclick={() => open = false} class="rounded-xl px-6">
          Cancel
        </Button>
        <Button 
          onclick={save} 
          disabled={saving}
          class="bg-brown hover:bg-brown/90 text-white rounded-xl px-8 flex items-center gap-2 shadow-lg shadow-brown/20"
        >
          {#if saving}
            <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Saving...
          {:else}
            <Save size={18} />
            Save Changes
          {/if}
        </Button>
      </div>
    </div>
  </div>
{/if}
