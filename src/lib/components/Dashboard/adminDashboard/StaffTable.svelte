<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from "$lib/components/ui/avatar";
  import StaffActions from "./StaffActions.svelte";
  import type { Employee } from "$lib/types/staff";

  const { staff } = $props<{ staff: Employee[] }>();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Employee</Table.Head>
      <Table.Head>Role</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head class="text-right">Actions</Table.Head>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {#each staff as emp}
      <Table.Row>
        <!-- EMPLOYEE -->
        <Table.Cell>
          <div class="flex items-center gap-3">
            <Avatar.Root>
              <Avatar.Image src={emp.image} />
              <Avatar.Fallback>
                { emp.name[0]}
              </Avatar.Fallback>
            </Avatar.Root>

            <div>
              <p class="font-medium">{emp.name}</p>
              <p class="text-sm text-muted-foreground">{emp.email}</p>
            </div>
          </div>
        </Table.Cell>

        <Table.Cell>{emp.role || "stylist"}</Table.Cell>

        <!-- STATUS -->
        <Table.Cell>
          <span
            class={`px-2 py-0.5 rounded-full text-xs font-medium
              ${emp.status === "active"
                ? "bg-emerald-100/40 text-emerald-700"
                : "bg-muted text-muted-foreground"}
            `}
          >
            {emp.status}
          </span>
        </Table.Cell>

        <!-- ACTIONS -->
        <Table.Cell class="text-right">
          <StaffActions employee={emp} />
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
