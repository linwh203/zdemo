<template>
  <q-page class="q-pa-sm">
    <div class="container row">
      <div class="col-7">
        <TableForMachines @selectMachine="triggerMachineView" />
      </div>
      <div class="col q-ma-sm">
        <q-card class="my-card relative-position" style="height: 87vh">
          <q-card-section class="row">
            <q-img
              :src="machineImage[selectedMachine.machine_type]"
              class="col"
            />
            <div class="col-7 q-px-lg">
              <div class="text-overline">
                {{ selectedMachine.id || "Machine ID" }}
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                {{ selectedMachine.machine_type || "Machine Type" }}
              </div>
              <div class="text-caption text-grey">
                <div>Floor: {{ selectedMachine.floor || "-" }}</div>
                <div>
                  Install Date: {{ selectedMachine.install_date || "-" }}
                </div>
                <div>
                  Last Maintenance:
                  {{
                    selectedMachine.last_maintenance
                      ? date.formatDate(
                          selectedMachine.last_maintenance,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      : "-"
                  }}
                </div>
                <div>Longitude: {{ selectedMachine.longitude || "-" }}</div>
                <div>Latitude: {{ selectedMachine.latitude || "-" }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="row">
            <q-btn
              fab
              :color="mapStatusColor[selectedMachine.status] || 'primary'"
              :icon="mapStatusIcon[selectedMachine.status] || 'mode_standby'"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-end q-ml-auto">
              <div class="col text-h6 ellipsis">&nbsp;</div>
              <div
                class="col-auto text-dard text-caption q-pt-md row no-wrap items-center"
              >
                {{ selectedMachine.status }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">$・Specific Information</div>
            <div class="text-caption text-grey">
              Switch tab to get real time information or machine events list
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-tabs v-model="tab" class="text-teal">
              <q-tab label="Real Time Info" name="one" />
              <q-tab label="Events List" name="two" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="one">
                <q-list bordered separator>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label overline>Machine ID</q-item-label>
                      <q-item-label>{{
                        selectedMachineRealtimeInfo.machine_id || "N/A"
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section
                      >Timestamp:
                      {{
                        selectedMachineRealtimeInfo.timestamp
                          ? date.formatDate(
                              selectedMachineRealtimeInfo.timestamp,
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : "N/A"
                      }}</q-item-section
                    >
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>Status</q-item-label>
                      <q-item-label caption>{{
                        selectedMachineRealtimeInfo.status || "N/A"
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label overline>Message ID</q-item-label>
                      <q-item-label>{{
                        selectedMachineRealtimeInfo.id || "N/A"
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label overline>Coming WS Message:</q-item-label>
                      <q-item-label
                        caption
                        v-for="info of wsData"
                        :key="info"
                        >{{ info }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="two">
                <q-table
                  dense
                  flat
                  style="height: 40vh"
                  :rows="selectedMachineEvents"
                  :columns="columns"
                  row-key="index"
                  virtual-scroll
                  :rows-per-page-options="[0]"
                >
                  <template v-slot:top></template>
                </q-table>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
          <q-inner-loading :showing="cardLoading">
            <q-spinner-tail size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import TableForMachines from "src/components/TableForMachines.vue";
import { fetchAllMachineByID } from "src/api/restful";
import { mapStatusColor, mapStatusIcon } from "src/utils/color";
import { date } from "quasar";
import useSocket from "src/hooks/useSocket";

const machineImage = {
  measurement:
    "https://5.imimg.com/data5/HU/TG/MY-8481510/spectrum-coordinate-measuring-machine-250x250.jpg",
  microscope:
    "https://www.zeiss.de/mikroskopie/produkte/stereo-zoom-microscopes/j/m/productmetadata_648b/imageTI.mobile.980.jpg/1454666378391.jpg/axiozoom-optical-inspection.jpg",
};

const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    align: "left",
    field: (row) => row.timestamp,
    format: (val) => date.formatDate(val, "YYYY-MM-DD HH:mm:ss"),
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: (row) => row.status,
    sortable: false,
  },
];

const tab = ref("one");
const cardLoading = ref(false);
const selectedMachine = ref({});
const selectedMachineEvents = ref([]);
const selectedMachineRealtimeInfo = ref({});

function startLoading() {}

async function triggerMachineView(row) {
  cardLoading.value = true;
  selectedMachine.value = row;
  const { data } = await fetchAllMachineByID(row.id);
  if (data) {
    renderMachineView(data);
  }
  cardLoading.value = false;
}

async function renderMachineView(data) {
  selectedMachine.value = data;
  selectedMachineEvents.value = data.events;
  searchMessageFromHistory();
}

const { wsHistory, wsData } = useSocket();

function searchMessageFromHistory() {
  const machineID = selectedMachine.value.id;
  const historyMsg = wsHistory.value.findLast(
    (item) => item.machine_id == machineID
  );
  if (historyMsg) {
    selectedMachineRealtimeInfo.value = historyMsg;
  }
}

watch(
  wsData,
  () => {
    if (wsData.value.machine_id === selectedMachine.value?.id) {
      selectedMachineRealtimeInfo.value = wsData.value;
      selectedMachine.value.status = wsData.value.status;
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  startLoading();
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.chartBlock {
  display: grid;
  // align-items: center;
}
.chart-golden-cham {
  // height: 400px;
}
.section {
  display: grid;
  gap: 1rem;
}
.indigo-14 {
  color: $indigo-14;
}
</style>