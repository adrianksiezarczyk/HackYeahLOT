using System;
using System.Collections.Generic;
using System.Text;

namespace LOT.Services.FlightService.Models
{
    public class FlightDetailsModel
    {
        public DateTime DepartueDate { get; set; }
        public DateTime LocalArrivalDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime? ArrivalReturnDate { get; set; }
        public string PlaneName { get; set; }
        public string DeepLink { get; set; }
        public decimal TotalPrice { get; set; }

        public List<PlaneSeat> DepartuePlaneSeats { get; set; }
        public List<PlaneSeat> ReturnPlaneSeats { get; set; }
    }
}
