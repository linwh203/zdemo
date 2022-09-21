import { api } from "src/boot/axios";
import { Notify } from "quasar";

const NotifyError = (msg) =>
  Notify.create({
    type: "negative",
    message: msg,
    position: "top",
    timeout: 3000,
  });

export async function fetchAllMachine() {
  try {
    const { data } = await api.get("/machines");
    return data;
  } catch (error) {
    NotifyError(error.message);
    return error.message;
  }
}

export async function fetchAllMachineByID(machine_id) {
  try {
    const { data } = await api.get(`/machines/${machine_id}`);
    return data;
  } catch (error) {
    NotifyError(error.message);
    return error.message;
  }
}
