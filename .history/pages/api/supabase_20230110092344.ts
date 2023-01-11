import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabase';


const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {

  const { data, error } = await supabase.from('items').select("*");
  // let  data2 = await supabase.from('items').select("*").eq("category",category);
  // 401 Unauthorized、認証が必要
  if (error) {
    return res.status(401).json({ error: error.message });
  } else {
    return res.status(200).json(data);
  }
}

export default getAirportAPI;
