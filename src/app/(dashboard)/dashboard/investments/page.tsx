import { Metadata } from "next";
import { getInvestments } from "@/services/client/r.service";
import { getServerUserId } from "@/lib/server/auth0-server";
import InvestmentClient from "../_components/investments/InvestmentClient";

export const metadata: Metadata = {
  title: "Transactions | WG",
  description: "View and manage your transaction history",
};

const Transactions = async () => {

  const userId = await getServerUserId();
  const res = await getInvestments(userId);

  const data = res?.data ?? []

  return (
    <div className="">
      <InvestmentClient investments={data} />
    </div>
  );
};

export default Transactions;
