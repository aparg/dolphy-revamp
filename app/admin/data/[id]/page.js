"use client";

import PreconstructionForm from "../../components/PreconstructionForm";

export default function EditPreconstruction({ params }) {
  return <PreconstructionForm preconId={params.id} />;
}
