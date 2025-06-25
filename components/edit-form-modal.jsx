"use client";
import { useState } from "react";
import { EditForm } from "./edit-form";

export default function EditFormModal({ userInfo }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Edit Profile</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <EditForm userInfo={userInfo} />
          </div>
        </div>
      )}
    </>
  );
}