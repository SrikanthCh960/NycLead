import type { Metadata } from "next";
import { servicesMap } from "@/lib/services-data";
import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";

const config = servicesMap["digital-transformation"];

export const metadata: Metadata = {
  title:       config.meta.title,
  description: config.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={config} />;
}
