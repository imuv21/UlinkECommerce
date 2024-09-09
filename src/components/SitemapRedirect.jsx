import React, { useEffect } from "react";


const SitemapRedirect = () => {
    
  useEffect(() => {
    window.location.href = "https://api.ulinkit.com/api/sitemap.xml";
  }, []);

  return null;
};

export default SitemapRedirect;
