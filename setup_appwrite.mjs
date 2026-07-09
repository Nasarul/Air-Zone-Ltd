import { Client, Databases, Users, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !databaseId || !apiKey) {
    console.error("Missing environment variables. Please check your .env file.");
    console.error("Make sure VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_DATABASE_ID, and APPWRITE_API_KEY are set.");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);
const users = new Users(client);

async function createCollection(name, collectionId) {
    try {
        console.log(`Creating collection: ${name} (${collectionId})...`);
        await databases.createCollection(databaseId, collectionId, name);
        console.log(`✅ Collection '${name}' created.`);
    } catch (error) {
        if (error.code === 409) {
            console.log(`⚠️ Collection '${name}' already exists.`);
        } else {
            console.error(`❌ Failed to create collection '${name}':`, error.message);
        }
    }
}

async function createStringAttribute(collectionId, key, size, required = false, array = false) {
    try {
        await databases.createStringAttribute(databaseId, collectionId, key, size, required, undefined, array);
        console.log(`   + Attribute '${key}' created.`);
    } catch (error) {
        if (error.code === 409) console.log(`   - Attribute '${key}' already exists.`);
        else console.error(`   ❌ Failed to create attribute '${key}':`, error.message);
    }
}

async function createIntegerAttribute(collectionId, key, required = false, array = false) {
    try {
        await databases.createIntegerAttribute(databaseId, collectionId, key, required, undefined, undefined, undefined, array);
        console.log(`   + Attribute '${key}' created.`);
    } catch (error) {
        if (error.code === 409) console.log(`   - Attribute '${key}' already exists.`);
        else console.error(`   ❌ Failed to create attribute '${key}':`, error.message);
    }
}

async function createFloatAttribute(collectionId, key, required = false, array = false) {
    try {
        await databases.createFloatAttribute(databaseId, collectionId, key, required, undefined, undefined, array);
        console.log(`   + Attribute '${key}' created.`);
    } catch (error) {
        if (error.code === 409) console.log(`   - Attribute '${key}' already exists.`);
        else console.error(`   ❌ Failed to create attribute '${key}':`, error.message);
    }
}

async function setup() {
    console.log("Starting Appwrite Database Setup...");

    // 1. Tour Packages
    await createCollection("Tour Packages", "tour_packages");
    await createStringAttribute("tour_packages", "title", 255, true);
    await createStringAttribute("tour_packages", "image", 1000, true);
    await createStringAttribute("tour_packages", "duration", 100, true);
    await createIntegerAttribute("tour_packages", "durationDays", true);
    await createStringAttribute("tour_packages", "location", 255, true);
    await createStringAttribute("tour_packages", "price", 100, true);
    await createFloatAttribute("tour_packages", "rating", false);
    await createStringAttribute("tour_packages", "categories", 100, false, true); // array
    await createStringAttribute("tour_packages", "desc", 2000, true);
    await createStringAttribute("tour_packages", "inclusions", 255, false, true); // array

    // 2. Visa Services
    await createCollection("Visa Services", "visa_services");
    await createStringAttribute("visa_services", "country", 255, true);
    await createStringAttribute("visa_services", "flag", 1000, true);
    await createStringAttribute("visa_services", "days", 100, true);
    await createStringAttribute("visa_services", "category", 255, true);
    await createStringAttribute("visa_services", "price", 100, true);
    await createStringAttribute("visa_services", "iconName", 100, true);

    // 3. Flight Deals
    await createCollection("Flight Deals", "flight_deals");
    await createStringAttribute("flight_deals", "airline", 255, true);
    await createStringAttribute("flight_deals", "logo", 1000, true);
    await createStringAttribute("flight_deals", "fromLocation", 255, true);
    await createStringAttribute("flight_deals", "toLocation", 255, true);
    await createStringAttribute("flight_deals", "price", 100, true);
    await createStringAttribute("flight_deals", "duration", 100, true);
    await createStringAttribute("flight_deals", "stops", 100, true);
    await createStringAttribute("flight_deals", "cabin", 100, true);
    await createStringAttribute("flight_deals", "baggage", 100, true);
    await createStringAttribute("flight_deals", "type", 100, true);
    await createStringAttribute("flight_deals", "details", 2000, true);
    await createStringAttribute("flight_deals", "schedule", 255, true);

    // 4. Testimonials
    await createCollection("Testimonials", "testimonials");
    await createStringAttribute("testimonials", "name", 255, true);
    await createStringAttribute("testimonials", "role", 255, true);
    await createStringAttribute("testimonials", "image", 1000, true);
    await createStringAttribute("testimonials", "text", 2000, true);
    await createIntegerAttribute("testimonials", "rating", true);

    // 5. Team Members
    await createCollection("Team Members", "team_members");
    await createStringAttribute("team_members", "name", 255, true);
    await createStringAttribute("team_members", "role", 255, true);
    await createStringAttribute("team_members", "avatar", 1000, true);

    // 6. System Logs
    await createCollection("System Logs", "system_logs");
    await createStringAttribute("system_logs", "timestamp", 100, true);
    await createStringAttribute("system_logs", "level", 50, true);
    await createStringAttribute("system_logs", "category", 50, true);
    await createStringAttribute("system_logs", "message", 1000, true);

    // 7. CMS Settings (Global configurations)
    await createCollection("CMS Settings", "cms_settings");
    await createStringAttribute("cms_settings", "key", 100, true);
    // Value will store stringified JSON of the settings
    await createStringAttribute("cms_settings", "value", 20000, true);

    // 8. User Profiles (For Roles, Avatars, Bios, etc.)
    await createCollection("User Profiles", "user_profiles");
    await createStringAttribute("user_profiles", "name", 255, true);
    await createStringAttribute("user_profiles", "email", 255, true);
    await createStringAttribute("user_profiles", "role", 100, true); // e.g., 'Super Admin', 'Admin', 'Manager', 'User'
    await createStringAttribute("user_profiles", "status", 50, true); // e.g., 'Active', 'Pending', 'Suspended'
    await createStringAttribute("user_profiles", "avatar", 1000, false);
    await createStringAttribute("user_profiles", "bio", 2000, false);
    await createStringAttribute("user_profiles", "phone", 50, false);
    await createStringAttribute("user_profiles", "address", 1000, false);
    await createStringAttribute("user_profiles", "lastLogin", 100, false);

    console.log("🎉 Database schema built! Waiting 10 seconds for Appwrite to finalize attributes before inserting data...");

    // Wait for attributes to be fully available before inserting documents
    await new Promise(resolve => setTimeout(resolve, 10000));

    try {
        console.log("\n👤 Provisioning Super Admin account...");
        const email = "nasarulhasan@gmail.com";
        const password = "!@#$%^&*"; // Appwrite requires passwords to be between 8 and 256 characters long
        const name = "Nasarul Hasan";

        let userId;
        try {
            const newUser = await users.create(ID.unique(), email, undefined, password, name);
            userId = newUser.$id;
            console.log(`   ✅ Auth account created for ${email}`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`   ⚠️ Auth account ${email} already exists. Fetching User ID...`);
                const userList = await users.list([Query.equal("email", email)]);
                if (userList.total > 0) {
                    userId = userList.users[0].$id;
                }
            } else {
                console.error(`   ❌ Failed to create auth user:`, error.message);
            }
        }

        if (userId) {
            try {
                // Use the Auth userId as the Document ID for 1:1 mapping
                await databases.createDocument(databaseId, "user_profiles", userId, {
                    name: name,
                    email: email,
                    role: "Super Admin",
                    status: "Active"
                });
                console.log(`   ✅ Super Admin profile document created successfully!`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ⚠️ Profile already exists. Updating role to Super Admin...`);
                    await databases.updateDocument(databaseId, "user_profiles", userId, {
                        role: "Super Admin"
                    });
                    console.log(`   ✅ Role upgraded to Super Admin!`);
                } else {
                    console.error(`   ❌ Failed to create user profile document:`, error.message);
                }
            }
        }
    } catch (err) {
        console.error("   ❌ Error provisioning Super Admin:", err.message);
    }

    // --- SEED DATA INSERTION ---
    console.log("\n📦 Inserting Default Seed Data into Collections...");

    const seedPackages = [
        { packageId: 'bali-honeymoon', title: '4D/3N Bali Honeymoon Bliss', image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '4 Days 3 Nights', durationDays: 4, location: 'Bali, Indonesia', price: '৳98,000', rating: 4.9, categories: ['international', 'honeymoon'], desc: 'Unwind in a luxurious private pool villa.', inclusions: ['4-Star Private Pool Villa', 'Transfers'] },
        { packageId: 'dubai-highlights', title: '6D/5N Dubai City Highlights', image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '6 Days 5 Nights', durationDays: 6, location: 'Dubai, UAE', price: '৳1,25,000', rating: 4.8, categories: ['international'], desc: 'Experience the glitz and glamour of Dubai.', inclusions: ['4-Star Hotel Accommodation', 'Desert Safari'] },
        { packageId: 'coxs-bazar', title: '5D/4N Cox\'s Bazar Escape', image: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '5 Days 4 Nights', durationDays: 5, location: 'Cox\'s Bazar, BD', price: '৳28,500', rating: 4.7, categories: ['domestic'], desc: 'Relax on the world\'s longest natural sandy beach.', inclusions: ['Premium Beach Resort Stay'] }
    ];

    for (const pkg of seedPackages) {
        try {
            await databases.createDocument(databaseId, 'tour_packages', ID.unique(), pkg);
            console.log(`   + Inserted Tour Package: ${pkg.title}`);
        } catch (e) { console.error(`   - Failed to insert ${pkg.title}:`, e.message); }
    }

    const seedVisas = [
        { country: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png', days: '12–18 working days', category: 'Tourist / Business', price: '৳18,500', iconName: 'FileText' },
        { country: 'Saudi Arabia', flag: 'https://flagcdn.com/w80/sa.png', days: '5–8 working days', category: 'Tourist / Visit', price: '৳14,500', iconName: 'FileCheck2' },
        { country: 'Japan', flag: 'https://flagcdn.com/w80/jp.png', days: '8–12 working days', category: 'Tourist / Business', price: '৳7,500', iconName: 'Send' }
    ];

    for (const visa of seedVisas) {
        try {
            await databases.createDocument(databaseId, 'visa_services', ID.unique(), visa);
            console.log(`   + Inserted Visa: ${visa.country}`);
        } catch (e) { console.error(`   - Failed to insert ${visa.country}:`, e.message); }
    }

    const seedTestimonials = [
        { name: 'Mohammad Hasan', role: 'Business Executive', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', text: 'Air Zone arranged our Europe group tour perfectly.', rating: 5 },
        { name: 'Fatima Begum', role: 'Homemaker', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop&q=80', text: 'Air Zone booked our family flight tickets to Canada at an unbeatable rate.', rating: 5 }
    ];

    for (const t of seedTestimonials) {
        try {
            await databases.createDocument(databaseId, 'testimonials', ID.unique(), t);
            console.log(`   + Inserted Testimonial: ${t.name}`);
        } catch (e) { console.error(`   - Failed to insert ${t.name}:`, e.message); }
    }

    const seedTeam = [
        { name: 'Rafiqul Islam', role: 'Managing Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&q=80' },
        { name: 'Nasrin Akter', role: 'Head of Operations', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop&q=80' }
    ];

    for (const member of seedTeam) {
        try {
            await databases.createDocument(databaseId, 'team_members', ID.unique(), member);
            console.log(`   + Inserted Team Member: ${member.name}`);
        } catch (e) { console.error(`   - Failed to insert ${member.name}:`, e.message); }
    }

    const seedFlights = [
        { airline: 'US-Bangla Airlines', logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150', fromLocation: 'Dhaka (DAC)', toLocation: 'Cox\'s Bazar (CXB)', price: '৳6,200', duration: '1h 00m', stops: 'Non-stop', cabin: 'Economy', baggage: '20 kg', type: 'domestic', details: 'Regular daily flights on comfortable turboprop aircraft.', schedule: '08:30 AM - 09:30 AM' },
        { airline: 'Emirates', logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150', fromLocation: 'Dhaka (DAC)', toLocation: 'Dubai (DXB)', price: '৳68,000', duration: '4h 30m', stops: 'Non-stop', cabin: 'Economy', baggage: '30 kg', type: 'international', details: 'Fly on the world-class Boeing 777.', schedule: '07:30 PM - 11:00 PM' }
    ];

    for (const flight of seedFlights) {
        try {
            await databases.createDocument(databaseId, 'flight_deals', ID.unique(), flight);
            console.log(`   + Inserted Flight Deal: ${flight.toLocation}`);
        } catch (e) { console.error(`   - Failed to insert flight ${flight.toLocation}:`, e.message); }
    }

    const seedCmsSettings = [
        { key: 'contactSettings', value: JSON.stringify({ email1: 'info@airzoneltd.com', phone1: '+880 1700-000001', address: 'Farmgate, Dhaka' }) },
        { key: 'footerSettings', value: JSON.stringify({ companyName: 'Air Zone Ltd.', brandTagline: 'Your trusted travel partner for tours, flight tickets, and visa services.' }) },
        { key: 'aboutSettings', value: JSON.stringify({ title: 'Your Trusted Travel Partner Since 2009', yearsExperience: '15+' }) }
    ];

    for (const setting of seedCmsSettings) {
        try {
            await databases.createDocument(databaseId, 'cms_settings', setting.key, setting);
            console.log(`   + Inserted CMS Setting: ${setting.key}`);
        } catch (e) { console.error(`   - Failed to insert setting ${setting.key}:`, e.message); }
    }

    console.log("\n✅ All Setup Tasks Finished Successfully.");
}

setup();
