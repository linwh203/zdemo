import { ref, onMounted, onUnmounted } from "vue";

const wsPath = "ws://codingcase.zeiss.services/ws";

export default function () {
  let client = ref(null);

  const wsData = ref({});
  const wsHistory = ref([]);

  onMounted(() => {
    client.value = new WebSocket(wsPath);
    client.value.onopen = (e) => {
      // console.log("open client", e);
    };

    client.value.onmessage = (e) => {
      // console.log("message,", e);
      const { data } = e;
      if (data) {
        const parsedData = Object.assign(JSON.parse(data), {});
        wsData.value = parsedData.payload;
        wsHistory.value.push(parsedData.payload);
        console.log(wsData.value);
      }
    };
  });

  onUnmounted(() => {
    client.value.close();
    client.value = null;
  });

  return {
    client,
    wsData,
    wsHistory,
  };
}
