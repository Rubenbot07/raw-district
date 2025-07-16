import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { completeUserProfile } from "@/actions/complete-user-profile";


export const CompleteProfileForm = () => {
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Complete your profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={completeUserProfile} className="flex flex-col gap-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}