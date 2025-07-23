import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuoteLeft, 
  faStar, 
  faChevronLeft, 
  faChevronRight,
  faGraduationCap,
  faLaptopCode,
  faFlask,
  faBalanceScale,
  faChartLine,
  faSchool
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const SuccessStories = () => {
  // 20 Detailed Testimonials
  const allTestimonials = [
    // College/University Students
    {
      id: 1,
      name: "Sarah K.",
      program: "Medical Student",
      rating: 5,
      content: "Scored 95% on my nursing dissertation thanks to their expert guidance on research methodology and statistical analysis.",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      date: "2023-10-15",
      programIcon: faFlask
    },
    {
      id: 2,
      name: "James M.",
      program: "Computer Science",
      rating: 5,
      content: "My Python data structures project was completed 3 days early with perfect documentation. The code was so clean my professor used it as a class example!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "2023-11-02",
      programIcon: faLaptopCode
    },
    {
      id: 3,
      name: "Fatima A.",
      program: "MBA Student",
      rating: 4,
      content: "Received distinction on my business case study analysis. The writer perfectly applied Porter's Five Forces and SWOT analysis frameworks.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "2023-09-28",
      programIcon: faChartLine
    },
    {
      id: 4,
      name: "David T.",
      program: "Law Student",
      rating: 5,
      content: "My appellate brief was called 'publishable quality' by my professor. The legal research was exhaustive and writing was impeccable.",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      date: "2023-12-05",
      programIcon: faBalanceScale
    },
    {
      id: 5,
      name: "Priya N.",
      program: "Engineering Student",
      rating: 5,
      content: "MATLAB tutor helped me debug my signal processing code and explained complex concepts clearly. Project got highest marks in class!",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      date: "2023-11-18",
      programIcon: faLaptopCode
    },
    {
      id: 6,
      name: "Michael B.",
      program: "PhD Candidate",
      rating: 4,
      content: "Literature review service found sources I hadn't discovered and organized them thematically. Needed minor revisions but extremely thorough.",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      date: "2023-12-10",
      programIcon: faGraduationCap
    },
    {
      id: 7,
      name: "Aisha C.",
      program: "Nursing Student",
      rating: 5,
      content: "Passed my pharmacology exam with 98% after struggling with drug classifications. The tutor created perfect study guides and mnemonics.",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "2023-10-30",
      programIcon: faFlask
    },
    {
      id: 8,
      name: "Carlos R.",
      program: "Economics Major",
      rating: 5,
      content: "Econometrics assignment was flawless. The regression analysis and interpretation exceeded professor's expectations. Will use again!",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "2023-11-22",
      programIcon: faChartLine
    },
    {
      id: 9,
      name: "Emily S.",
      program: "Psychology Student",
      rating: 4,
      content: "My 20-page research paper on cognitive development was well-structured and properly cited in APA format. Great writing quality.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "2023-12-03",
      programIcon: faGraduationCap
    },
    {
      id: 10,
      name: "Kwame T.",
      program: "Computer Science",
      rating: 5,
      content: "Java multithreading project was optimized beyond requirements. The comments and documentation made it easy to present to my class.",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      date: "2023-11-15",
      programIcon: faLaptopCode
    },
    {
      id: 11,
      name: "Linh N.",
      program: "Accounting Student",
      rating: 5,
      content: "Advanced financial accounting homework was completed with perfect calculations and GAAP-compliant reporting. Saved me 15 hours!",
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      date: "2023-10-10",
      programIcon: faChartLine
    },
    {
      id: 12,
      name: "Omar K.",
      program: "Medical Student",
      rating: 5,
      content: "Histology lab reports were detailed with perfect microscope image annotations. Scored 100% on all three assignments!",
      image: "https://randomuser.me/api/portraits/men/63.jpg",
      date: "2023-12-12",
      programIcon: faFlask
    },
    {
      id: 13,
      name: "Sophia L.",
      program: "Law Student",
      rating: 4,
      content: "Contract law assignment analyzed all key cases and precedents. The IRAC method was applied perfectly. Minor formatting fixes needed.",
      image: "https://randomuser.me/api/portraits/women/77.jpg",
      date: "2023-11-05",
      programIcon: faBalanceScale
    },
    {
      id: 14,
      name: "Diego M.",
      program: "Engineering Student",
      rating: 5,
      content: "Thermodynamics problems were solved with clear step-by-step explanations. The tutor even provided supplemental learning resources.",
      image: "https://randomuser.me/api/portraits/men/38.jpg",
      date: "2023-10-25",
      programIcon: faLaptopCode
    },
    {
      id: 15,
      name: "Yuki T.",
      program: "MBA Student",
      rating: 5,
      content: "Strategic management case study included perfect PESTEL and VRIO analyses. Presentation slides were professional and concise.",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
      date: "2023-12-08",
      programIcon: faChartLine
    },
    {
      id: 16,
      name: "Marcus P.",
      program: "Computer Science",
      rating: 5,
      content: "Database normalization assignment was perfect. The ER diagrams and SQL queries were optimized better than the textbook examples!",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
      date: "2023-11-29",
      programIcon: faLaptopCode
    },
    {
      id: 17,
      name: "Nia J.",
      program: "Psychology Student",
      rating: 4,
      content: "Statistical analysis for my research project was flawless. The tutor explained ANOVA results in a way I could actually understand.",
      image: "https://randomuser.me/api/portraits/women/84.jpg",
      date: "2023-12-15",
      programIcon: faGraduationCap
    },

    // High School Students
    {
      id: 18,
      name: "Ethan R.",
      program: "High School Student",
      rating: 5,
      content: "Struggled with Algebra II on Edgenuity until I found Assignment Helper. Their tutors broke down complex concepts into simple steps. Went from failing to a 92% final grade!",
      image: "https://randomuser.me/api/portraits/men/18.jpg",
      date: "2023-11-14",
      programIcon: faSchool,
      platform: "Edgenuity"
    },
    {
      id: 19,
      name: "Sophie L.",
      program: "High School Student",
      rating: 5,
      content: "Was behind in my English course on Edmentum. The writing coach helped me structure my essays properly and my grades improved by two letter grades in just 3 weeks!",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      date: "2023-12-05",
      programIcon: faSchool,
      platform: "Edmentum"
    },
    {
      id: 20,
      name: "Daniel K.",
      program: "High School Student",
      rating: 4,
      content: "Chemistry on Brightspace was overwhelming. The tutor simplified all the concepts and helped me with lab reports. Now I actually understand stoichiometry!",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "2023-10-30",
      programIcon: faSchool,
      platform: "Brightspace"
    }
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 6;
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);

  // State for filtering
  const [filter, setFilter] = useState('all');
  const [filteredTestimonials, setFilteredTestimonials] = useState(allTestimonials);

  // Filter testimonials when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredTestimonials(allTestimonials);
    } else if (filter === 'High School') {
      setFilteredTestimonials(allTestimonials.filter(t => t.program.includes('High School')));
    } else {
      setFilteredTestimonials(allTestimonials.filter(t => t.program.toLowerCase().includes(filter.toLowerCase())));
    }
    setCurrentPage(1);
  }, [filter]);

  // Update displayed testimonials when page or filter changes
  useEffect(() => {
    const indexOfLast = currentPage * testimonialsPerPage;
    const indexOfFirst = indexOfLast - testimonialsPerPage;
    setDisplayedTestimonials(filteredTestimonials.slice(indexOfFirst, indexOfLast));
  }, [currentPage, filteredTestimonials]);

  // Program types for filter buttons
  const programTypes = [
    { value: 'all', label: 'All Programs', icon: faGraduationCap },
    { value: 'Medical', label: 'Medical', icon: faFlask },
    { value: 'Computer Science', label: 'Computer Science', icon: faLaptopCode },
    { value: 'MBA', label: 'Business', icon: faChartLine },
    { value: 'Law', label: 'Law', icon: faBalanceScale },
    { value: 'Psychology', label: 'Psychology', icon: faGraduationCap },
    { value: 'Engineering', label: 'Engineering', icon: faLaptopCode },
    { value: 'High School', label: 'High School', icon: faSchool }
  ];

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-4 section-title">
        <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
        Student Success Stories
      </h1>
      
      {/* Filter Buttons */}
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {programTypes.map(({value, label, icon}) => (
          <Button
            key={value}
            variant={filter === value ? 'primary' : 'outline-primary'}
            className="mx-2 mb-2 filter-btn"
            onClick={() => setFilter(value)}
          >
            <FontAwesomeIcon icon={icon} className="me-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-4">
        <Badge bg="info" className="fs-6 p-2">
          Showing {filteredTestimonials.length} {filter === 'all' ? 'total' : filter.toLowerCase()} testimonials
        </Badge>
      </div>

      {/* Testimonials Grid */}
      <Row className="g-4">
        {displayedTestimonials.length > 0 ? (
          displayedTestimonials.map((testimonial) => (
            <Col key={testimonial.id} md={6} lg={4}>
              <Card className={`h-100 testimonial-card ${testimonial.platform ? 'hs-testimonial' : ''}`}>
                <Card.Body className="p-4">
                  {/* Platform badge for high school students */}
                  {testimonial.platform && (
                    <Badge bg="info" className="mb-2 platform-badge">
                      <FontAwesomeIcon icon={faSchool} className="me-1" />
                      {testimonial.platform}
                    </Badge>
                  )}
                  
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                      }}
                    />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <small className="text-muted d-block">
                        <FontAwesomeIcon icon={testimonial.programIcon} className="me-2" />
                        {testimonial.program}
                      </small>
                      <small className="text-muted">{testimonial.date}</small>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon 
                        key={i}
                        icon={faStar} 
                        className={i < testimonial.rating ? "text-warning" : "text-muted"} 
                      />
                    ))}
                  </div>
                  
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-primary me-2" />
                  <p className="d-inline">{testimonial.content}</p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4>No testimonials found for this filter</h4>
            <Button variant="outline-primary" onClick={() => setFilter('all')}>
              Show All Testimonials
            </Button>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {filteredTestimonials.length > testimonialsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="mx-1 pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
            Previous
          </Button>
          
          {[...Array(Math.ceil(filteredTestimonials.length / testimonialsPerPage))].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
              onClick={() => setCurrentPage(i + 1)}
              className="mx-1 pagination-button"
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline-primary"
            disabled={currentPage === Math.ceil(filteredTestimonials.length / testimonialsPerPage)}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="mx-1 pagination-button"
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
          </Button>
        </div>
      )}
    </Container>
  );
};

export default SuccessStories;