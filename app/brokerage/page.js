import HeroBrokerage from "@/components/brokerage/HeroBrokerage";
import FeaturesBrokerage from "@/components/brokerage/FeaturesBrokerage";
import ApplicationForm from "@/components/brokerage/ApplicationForm";

export default function BrokeragePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroBrokerage />
      <FeaturesBrokerage />
      <div id="apply-form">
        <ApplicationForm />
      </div>
    </main>
  );
}
