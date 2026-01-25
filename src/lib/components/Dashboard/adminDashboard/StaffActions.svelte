<script lang="ts">
  import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import { Eye, Pencil, Trash } from "lucide-svelte";
  import type { Employee } from "$lib/types/staff";

  const { employee } = $props<{ employee: Employee }>();
</script>

<Dropdown.Root>
  <Dropdown.Trigger class="p-2 rounded-md hover:bg-secondary/30">
    •••
  </Dropdown.Trigger>

  <Dropdown.Content align="end">
    <Dropdown.Item>
      <Eye size={16} class="mr-2" /> View
    </Dropdown.Item>

    <Dropdown.Item>
      <Pencil size={16} class="mr-2" /> Edit
    </Dropdown.Item>

    <Dropdown.Separator />

    <Dropdown.Item class="text-destructive">
      <Trash size={16} class="mr-2" /> Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
