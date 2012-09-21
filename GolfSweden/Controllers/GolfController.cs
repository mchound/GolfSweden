using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GolfSweden.Data;
using System.Threading;

namespace GolfSweden.Controllers
{
    public class GolfController : ApiController
    {
        public object GetClubs()
        {
            GolfSwedenEntities db = new GolfSwedenEntities();
            var clubs = from club in db.Clubs
                        orderby club.Name
                        select new
                        {
                            name = club.Name,
                            id = club.Id
                        };

            return clubs;
        }

        public object GetCoursesByClubId(int clubId)
        {
            GolfSwedenEntities db = new GolfSwedenEntities();
            var courses = from course in db.Courses
                          where course.Club_id == clubId
                          orderby course.Name
                          select new {
                            name = course.Name,
                            id = course.Id
                          };
            
            return courses;
        }
    }
}
