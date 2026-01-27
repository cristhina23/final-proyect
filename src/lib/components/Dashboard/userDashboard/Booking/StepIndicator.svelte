<!--
  StepIndicator component
  Shows the current step in the booking process with numbered circles.
-->
<script lang="ts">
  const props = $props<{
    currentStep: number;
    steps: string[];
  }>();

  const { currentStep, steps } = $derived(props);
</script>

<div class="flex items-center justify-center mb-8">
  {#each steps as step, index}
    {@const stepNumber = index + 1}
    {@const isActive = stepNumber === currentStep}
    {@const isCompleted = stepNumber < currentStep}
    
    <!-- Step Circle -->
    <div class="flex items-center">
      <div class="flex flex-col items-center">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
          {isActive ? 'bg-primary text-white' : isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}"
        >
          {stepNumber}
        </div>
        <span class="text-xs mt-2 font-medium {isActive ? 'text-foreground' : 'text-muted-foreground'}">
          {step}
        </span>
      </div>
      
      <!-- Connector Line -->
      {#if index < steps.length - 1}
        <div 
          class="w-16 h-0.5 mx-4 transition-all
          {stepNumber < currentStep ? 'bg-primary' : 'bg-muted'}"
        ></div>
      {/if}
    </div>
  {/each}
</div>
