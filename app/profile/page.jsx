'use client'
import { useEffect, useState } from "react";
import { EditForm } from "@/components/edit-form";
import { useAuth} from '../context/AuthContext'

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { user, loading } = useAuth();

  console.log("User:", user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
    </div>
  );
}