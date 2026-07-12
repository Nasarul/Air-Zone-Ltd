import { databases, databaseId } from './appwrite';
import { ID, Query } from 'appwrite';

// Fetch all collections and assemble them into a shape that matches local DashboardContext state
export const fetchAllAppwriteData = async () => {
  try {
    const [
      packagesRes,
      visaRes,
      flightsRes,
      teamRes,
      testimonialsRes,
      cmsRes
    ] = await Promise.all([
      databases.listDocuments(databaseId, 'tour_packages', [Query.limit(100)]),
      databases.listDocuments(databaseId, 'visa_services', [Query.limit(100)]),
      databases.listDocuments(databaseId, 'flight_deals', [Query.limit(100)]),
      databases.listDocuments(databaseId, 'team_members', [Query.limit(100)]),
      databases.listDocuments(databaseId, 'testimonials', [Query.limit(100)]),
      databases.listDocuments(databaseId, 'cms_settings', [Query.limit(100)])
    ]);

    // Map Tour Packages
    const mappedPackages = packagesRes.documents.map((doc: any) => ({
      id: doc.$id,
      image: doc.image,
      title: doc.title,
      duration: doc.duration,
      durationDays: doc.durationDays,
      location: doc.location,
      price: doc.price,
      rating: doc.rating || 0,
      categories: doc.categories || [],
      desc: doc.desc,
      inclusions: doc.inclusions || []
    }));

    // Map Visa Services
    const mappedVisas = visaRes.documents.map((doc: any) => ({
      id: doc.$id,
      country: doc.country,
      flag: doc.flag,
      days: doc.days,
      price: doc.price,
      category: doc.category,
      iconName: doc.iconName
    }));

    // Map Flight Deals
    const mappedFlights = flightsRes.documents.map((doc: any) => ({
      id: doc.$id,
      airline: doc.airline,
      logo: doc.logo,
      from: doc.fromLocation,
      to: doc.toLocation,
      price: doc.price,
      duration: doc.duration,
      stops: doc.stops,
      cabin: doc.cabin,
      baggage: doc.baggage,
      type: doc.type as 'domestic' | 'international',
      details: doc.details,
      schedule: doc.schedule
    }));

    // Map Team
    const mappedTeam = teamRes.documents.map((doc: any) => ({
      id: doc.$id,
      name: doc.name,
      role: doc.role,
      avatar: doc.avatar
    }));

    // Map Testimonials
    const mappedTestimonials = testimonialsRes.documents.map((doc: any) => ({
      name: doc.name,
      role: doc.role,
      image: doc.image,
      text: doc.text,
      rating: doc.rating
    }));

    // Map CMS Settings
    const cmsSettings: Record<string, any> = {};
    cmsRes.documents.forEach((doc: any) => {
      try {
        cmsSettings[doc.key] = JSON.parse(doc.value);
      } catch (e) {
        console.error('Failed to parse CMS setting:', doc.key);
      }
    });

    return {
      packages: mappedPackages,
      visas: mappedVisas,
      flights: mappedFlights,
      team: mappedTeam,
      testimonials: mappedTestimonials,
      cms: cmsSettings
    };
  } catch (error) {
    console.error('Error fetching data from Appwrite:', error);
    return null;
  }
};

// Generic CMS Setting sync (for flat config objects like aboutSettings, footerSettings, etc)
export const syncCmsSettingToAppwrite = async (key: string, value: any) => {
  try {
    // Check if doc exists
    const existing = await databases.listDocuments(databaseId, 'cms_settings', [
      Query.equal('key', key)
    ]);
    
    const stringified = JSON.stringify(value);

    if (existing.total > 0) {
      await databases.updateDocument(databaseId, 'cms_settings', existing.documents[0].$id, {
        value: stringified
      });
    } else {
      await databases.createDocument(databaseId, 'cms_settings', key, {
        key,
        value: stringified
      });
    }
  } catch (err) {
    console.error(`Failed to sync CMS Setting ${key}:`, err);
  }
};

// Sync arrays (Tour Packages, Visas, etc.) by clearing the collection and re-inserting
// This is safe and efficient for small settings arrays
export const syncArrayToCollection = async (collectionId: string, items: any[], mapper: (item: any) => any) => {
  try {
    // 1. Fetch existing documents
    const existing = await databases.listDocuments(databaseId, collectionId, [Query.limit(100)]);
    
    // 2. Delete all existing documents to avoid stale data
    await Promise.all(existing.documents.map((doc: any) => 
      databases.deleteDocument(databaseId, collectionId, doc.$id)
    ));

    // 3. Insert new documents
    await Promise.all(items.map(item => 
      databases.createDocument(databaseId, collectionId, ID.unique(), mapper(item))
    ));
    
  } catch (err) {
    console.error(`Failed to sync array to collection ${collectionId}:`, err);
  }
};

// Save a contact form message from a user
export const submitContactMessage = async (messageData: any) => {
  try {
    // Save to Appwrite collection 'contact_messages'
    // Requires Guest 'Create' permissions in Appwrite Database
    await databases.createDocument(databaseId, 'contact_messages', ID.unique(), {
      name: messageData.name,
      email: messageData.email,
      phone: messageData.phone || '',
      service: messageData.service || 'General Inquiry',
      message: messageData.message,
      createdAt: new Date().toISOString(),
      ipAddress: messageData.ipAddress || 'unknown'
    });
  } catch (err) {
    console.error('Failed to save contact message to Appwrite:', err);
    // Do not throw, as we want the email to still send even if DB fails
  }
};
