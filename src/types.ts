export interface WaitlistApplication {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  platforms: string[];
  instagramUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  monthlyRevenue: string;
  selectedTier: string;
  ownerId: string;
  createdAt: any; // Firestore Timestamp / FieldValue
  updatedAt: any; // Firestore Timestamp / FieldValue
}
