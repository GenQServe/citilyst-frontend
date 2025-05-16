import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  return (
    <div className="container mx-auto p-4 space-y-20">
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">Citilyst</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your city management with our innovative platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40 rounded-3xl p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>City Management</CardTitle>
                <CardDescription>Streamline urban operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our comprehensive city management tools help administrators
                  maintain infrastructure and coordinate services efficiently.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citizen Engagement</CardTitle>
                <CardDescription>Connect with your community</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Build stronger relationships with citizens through transparent
                  communication and feedback systems.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>Make data-driven decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Leverage powerful analytics to understand trends and optimize
                  resource allocation across your city.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How Citilyst Works
          </h2>
          <Tabs defaultValue="citizens" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="citizens">For Citizens</TabsTrigger>
              <TabsTrigger value="government">For Government</TabsTrigger>
              <TabsTrigger value="businesses">For Businesses</TabsTrigger>
            </TabsList>
            <TabsContent value="citizens">
              <Card>
                <CardHeader>
                  <CardTitle>Citizen Portal</CardTitle>
                  <CardDescription>
                    Engage with your local government
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Access city services, submit requests, and stay informed
                    about local developments through our user-friendly citizen
                    portal.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Service Requests</h4>
                        <p className="text-sm text-muted-foreground">
                          Submit and track service requests easily
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Community Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Stay informed about local events and news
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign Up as Citizen</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="government">
              <Card>
                <CardHeader>
                  <CardTitle>Government Dashboard</CardTitle>
                  <CardDescription>
                    Efficient city administration tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Manage city operations, track performance metrics, and
                    respond to citizen needs through our comprehensive
                    administrative dashboard.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Resource Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Optimize allocation of city resources
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Performance Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Track key metrics and measure success
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Request Government Access</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="businesses">
              <Card>
                <CardHeader>
                  <CardTitle>Business Hub</CardTitle>
                  <CardDescription>
                    Connect with the local economy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Access permits, connect with local government, and engage
                    with the community through our dedicated business portal.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Permit Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Streamlined application and approval process
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Local Economy</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect with other local businesses
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Register Business</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Success Stories
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardHeader>
                      <Badge className="w-fit mb-2">Case Study {index}</Badge>
                      <CardTitle>City of Oakridge</CardTitle>
                      <CardDescription>Population: 150,000</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Reduced response time for citizen requests by 45% and
                        improved resource allocation efficiency by implementing
                        Citilyst platform.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="px-0">
                        Read full case study
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground rounded-3xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your City?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of cities that have improved efficiency and citizen
            satisfaction with Citilyst.
          </p>
          <Button size="lg" variant="secondary">
            Request a Demo
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
