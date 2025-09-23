import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/student/card";

export default function Profile() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="font-medium">Aleena Johny</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Roll No</span>
              <span className="font-medium">CS2025-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Course</span>
              <span className="font-medium">B.Tech Computer Science</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">aleena@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone</span>
              <span className="font-medium">+91 98765 43210</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
