import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/student/card';
import { Clock, Utensils, Scissors, Plus, CalendarX } from 'lucide-react';
import { Button } from '../../components/student/button';
import { Badge } from '../../components/student/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/student/dialog';
import { Input } from '../../components/student/input';
import { Textarea } from '../../components/student/textarea';
import { Label } from '../../components/student/label';

export function StudentMess() {
  const [messCut, setMessCut] = useState({ startDate: '', endDate: '', reason: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const messTimings = {
    breakfast: '7:30 AM - 9:00 AM',
    lunch: '12:30 PM - 2:00 PM',
    dinner: '7:00 PM - 8:30 PM'
  };

  const calculateDaysBetween = (start: string, end: string) => {
    if (!start || !end) return 0;
    return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="space-y-6">

      {/* Mess Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Meal Timings */}
        <Card className="bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Meal Timings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(messTimings).map(([meal, time]) => {
              const colors = {
                breakfast: 'from-yellow-100 to-orange-100 border-yellow-200 text-yellow-700 bg-yellow-50',
                lunch: 'from-blue-100 to-cyan-100 border-blue-200 text-blue-700 bg-blue-50',
                dinner: 'from-purple-100 to-pink-100 border-purple-200 text-purple-700 bg-purple-50'
              };
              return (
                <div key={meal} className={`flex items-center justify-between p-4 rounded-xl border shadow-sm bg-gradient-to-r ${colors[meal as keyof typeof colors]} transition-all hover:shadow-lg`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${meal}-500`}>
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium capitalize">{meal}</span>
                  </div>
                  <span className="font-semibold">{time}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Meal Options */}
        <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-green-600" />
              <span>Meal Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Vegetarian & Non-Vegetarian Menus */}
            {[
              { type: 'Vegetarian Menu', desc: 'Traditional vegetarian meals with variety of regional cuisines', color: 'green' },
              { type: 'Non-Vegetarian Menu', desc: 'Includes chicken, fish and egg preparations along with veg options', color: 'red' }
            ].map((menu, idx) => (
              <div key={idx} className={`p-4 border-2 rounded-xl bg-gradient-to-r from-${menu.color}-50 to-${menu.color}-100 border-${menu.color}-200`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold text-${menu.color}-800`}>{menu.type}</h4>
                  <Badge className={`bg-${menu.color}-500 text-white shadow-md`}>Available</Badge>
                </div>
                <p className="text-sm text-gray-600">{menu.desc}</p>
              </div>
            ))}

            {/* Current Subscription */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200 shadow-sm">
              <h4 className="font-semibold text-blue-800 mb-2">Current Subscription</h4>
              <p className="font-medium">Mixed Plan - ₹5,000/month</p>
              <p className="text-xs text-gray-600 mt-1">Includes all meal options</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mess Cut Section */}
      <Card className="bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scissors className="w-5 h-5 text-orange-600" />
              <span>Mess Cut Requests</span>
            </div>

            {/* Request Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" /> Request Mess Cut
                </Button>
              </DialogTrigger>

              {/* Dialog Content */}
              <DialogContent className="bg-white/95 backdrop-blur-lg border-orange-100 rounded-2xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2 text-orange-800">
                    <CalendarX className="w-5 h-5" />
                    <span>Request Mess Cut</span>
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Minimum 3 consecutive days required for mess cut
                  </p>
                </DialogHeader>

                <form className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={messCut.startDate}
                        onChange={(e) => setMessCut({ ...messCut, startDate: e.target.value })}
                        className="rounded-xl border-orange-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={messCut.endDate}
                        onChange={(e) => setMessCut({ ...messCut, endDate: e.target.value })}
                        className="rounded-xl border-orange-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Reason for mess cut"
                      value={messCut.reason}
                      onChange={(e) => setMessCut({ ...messCut, reason: e.target.value })}
                      rows={3}
                      className="rounded-xl border-orange-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-lg transition-all duration-300"
                    disabled={!messCut.startDate || !messCut.endDate || calculateDaysBetween(messCut.startDate, messCut.endDate) < 3}
                  >
                    <CalendarX className="w-4 h-4 mr-2" />
                    Submit Mess Cut Request
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Previous Mess Cut Entries */}
          {[
            { title: 'Vacation Leave', status: 'Approved', color: 'yellow', start: 'Dec 20, 2024', end: 'Jan 5, 2025', savings: 3200 },
            { title: 'Family Visit', status: 'Completed', color: 'green', start: 'Nov 15, 2024', end: 'Nov 18, 2024', savings: 800 }
          ].map((entry, idx) => (
            <div key={idx} className={`p-4 border-2 rounded-xl bg-gradient-to-r from-${entry.color}-50 to-${entry.color}-100 border-${entry.color}-200`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium text-${entry.color}-800`}>{entry.title}</h4>
                <Badge className={`bg-${entry.color}-500 text-white shadow-md`}>{entry.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{entry.start} - {entry.end} ({calculateDaysBetween(entry.start, entry.end)} days)</p>
              <p className="text-xs text-gray-500 mt-1">Savings: ₹{entry.savings}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
