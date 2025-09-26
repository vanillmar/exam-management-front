import { NextRequest, NextResponse } from 'next/server';
import aircraftGeneralKnowledge from '@/data/Aircraft_General_Knowledge_Instrument.json';
import instrumentRating from '@/data/Instrument_Rating.json';
import flightPlanning from '@/data/Flight_Planning.json';
import navigation from '@/data/Navigation.json';
import radioAids from '@/data/Radio_Aids.json';
import aircraftGeneral from '@/data/Aircraft_General_Knowledge.json';
import meteorology from '@/data/Meteorology.json';
import airlawNamibia from '@/data/Airlaw_Namibia.json';

const questionBanks = {
  'aircraft-technical': aircraftGeneralKnowledge,
  'instrument-rating': instrumentRating,
  'flight-planning': flightPlanning,
  'general-navigation': navigation,
  'radio-aids': radioAids,
  'aircraft-general': aircraftGeneral,
  'meteorology': meteorology,
  'airlaw': airlawNamibia
};

export async function GET(request: NextRequest, { params }: { params: { subject: string } }) {
  const { subject } = params;
  const bank = questionBanks[subject as keyof typeof questionBanks];
  if (!bank) {
    return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
  }
  return NextResponse.json(bank);
}