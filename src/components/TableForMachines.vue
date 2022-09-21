<template>
  <q-page class="full-width full-height">
    <div class="q-pa-sm full-width full-height">
      <q-table
        title="Machine List"
        :rows="filtedData"
        :columns="columns"
        row-key="time"
        :loading="loading"
        :rows-per-page-options="[10, 20]"
        :filter="filter"
        style="height: 87vh"
        virtual-scroll
        @row-click="handleRowClick"
      >
        <template v-slot:top>
          <div class="flex full-width justify-between items-center">
            <div class="">
              <q-radio v-model="filterByType" val="all" label="All Type" />
              <q-radio
                v-model="filterByType"
                val="measurement"
                label="Measurement"
              />
              <q-radio
                v-model="filterByType"
                val="microscope"
                label="Microscope"
              />
            </div>
            <q-space />
            <q-select
              :bg-color="mapStatusColor[filterByStatus]"
              outlined
              hide-bottom-space
              dense
              v-model="filterByStatus"
              :options="statusOptions"
              style="min-width: 150px"
            />
            <q-space />
            <q-input
              dense
              placeholder="Search machine id"
              debounce="300"
              color="primary"
              v-model="filter"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="mapStatusColor[props.value]"
              :label="props.value"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-location="props">
          <q-td :props="props" class="vertical-middle">
            <div>{{ props.value.split("/")[0] }}</div>
            <div>{{ props.value.split("/")[1] }}</div>
          </q-td>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { fetchAllMachine } from "src/api/restful";
import { ref, computed, onMounted, defineEmits } from "vue";
import { useQuasar, date } from "quasar";
import { mapStatusColor } from "src/utils/color";

const emits = defineEmits(["selectMachine"]);

const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: (row) => row.status,
    sortable: true,
  },
  {
    name: "machine_type",
    label: "Type",
    align: "left",
    field: (row) => row.machine_type,
    sortable: false,
  },
  {
    name: "floor",
    label: "Floor",
    align: "left",
    field: (row) => row.floor,
    sortable: true,
  },
  {
    name: "install_date",
    label: "Install Date",
    align: "left",
    field: (row) => row.install_date,
    sortable: true,
  },
  {
    name: "last_maintenance",
    label: "Last Maintenance",
    align: "left",
    field: (row) => row.last_maintenance,
    format: (val) => date.formatDate(val, "YYYY-MM-DD HH:mm:ss"),
    sortable: false,
  },
  {
    name: "location",
    label: "Location",
    align: "left",
    field: (row) => row.location,
    format: (val) => val,
    sortable: false,
  },
];

const statusOptions = ["all", "idle", "running", "finished", "errored"];

const $q = useQuasar();
const rows = ref([]);
const loading = ref(false);

const filter = ref("");
const filterByType = ref("all"); // all  measurement  microscope
const filterByStatus = ref("all"); // all idle, running, finished or errored

const filtedData = computed(() => {
  if (filterByType.value == "all") {
    return filterStatus();
  } else if (filterByStatus.value == "all") {
    return filterTypes();
  } else {
    return filterStatusAndTypes;
  }
});

function filterStatus() {
  return filterByStatus.value === "all"
    ? rows.value
    : rows.value.filter((row) => row.status === filterByStatus.value);
}

function filterTypes() {
  return filterByType.value === "all"
    ? rows.value
    : rows.value.filter((row) => row.machine_type === filterByType.value);
}
function filterStatusAndTypes() {
  return rows.value.filter(
    (row) =>
      row.machine_type === filterByType.value &&
      row.status === filterByStatus.value
  );
}

async function fetchData() {
  const result = await fetchAllMachine();
  const { data } = result;
  console.log(result);
  rows.value = data.map((d) => ({
    ...d,
    location: `longitude: ${d.longitude}/latitude: ${d.latitude}`,
  }));
  loading.value = false;
}

function handleRowClick(evt, row, index) {
  emits("selectMachine", row);
}

onMounted(() => {
  loading.value = true;
  fetchData();
  // setTimeout(() => {
  //   fetchData();
  // }, 500);
});
</script>
<style lang="scss">
.myTable {
  min-height: 72vh;
}
</style>