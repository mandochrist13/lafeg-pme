import Nav from "@/components/section/nav";
import Footer from "@/components/section/footer";
import  AdBanner  from "@/components/ads/AdBanner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="">
      <div>
              {" "}
              <section className="py-4 bg-gray-50 border-b">
                <div className="container flex justify-center">
                  <AdBanner
                    // type="image"
                    // size="leaderboard"
                    // position="header"
                    // content={{
                    //   title: "Cabinet Juridique Excellence - Conseil PME",
                    //   imageUrl: "/placeholder.svg?height=120&width=728",
                    //   ctaText: "Consultation gratuite",
                    //   advertiser: "Cabinet Excellence",
                    // }}
                  />
                </div>
              </section>
            </div>
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
