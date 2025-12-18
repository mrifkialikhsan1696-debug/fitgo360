import useAppStore from "../store/useAppStore";
import { api } from "./api";

export async function triggerPanic(notes) {
  const response = await api.escalate({ trigger: "panic", notes });
  useAppStore.getState().recordEmergency({
    status: response.status,
    destination: response.destination,
    etaMinutes: response.etaMinutes,
    notes,
  });
  return response;
}

export async function verifySymptoms(symptoms) {
  const verified = await api.verifyAction("symptom-check", symptoms);
  useAppStore.getState().logSymptomCheck(symptoms);
  return verified;
}

export async function fetchEscalationOptions() {
  const facilities = await api.fetchFacilities();
  return facilities;
}
