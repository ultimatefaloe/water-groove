"use server";

import { depositFormSchema, proofUploadSchema } from "@/lib/zod";
import { BankDetails, CreateDeposit } from "@/types/type";
import { uploadFileAction } from "./upload.action";
import { createDepositService, uploadDepositProofService } from "@/services/client/cud.service";

export type DepositActionState = {
  success: boolean;          // always set
  error?: string;            // optional
  bankDetails?: BankDetails; // optional
};


export type UploadProofActionState = {
  success: boolean;
  error?: string;
  data?: {
    reference: string
  }
};

export async function createDeposit(
  _prevState: DepositActionState,
  formData: FormData
): Promise<DepositActionState> {
  const rawData: CreateDeposit = {
    investmentCatId: String(formData.get("investmentCatId")),
    amount: Number(formData.get("amount")),
    description: String(formData.get("description")),
  };


  const parsed = depositFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed?.error.message ?? "Invalid form data",
    };
  }

  try {
    // simulate async work
    const res = await createDepositService({ ...rawData })

    console.log(res)

    if (!res.success && !res.data) {
      return {
        success: false,
        bankDetails: undefined,
        error: res.message || "Failed to initiate transaction"
      };
    }

    return {
      success: true,
      bankDetails: res.data ? { ...res.data } : undefined
    };

  } catch(err) {
    console.log(err)
    // ✅ unexpected failure
    return {
      success: false,
      error: "Failed to create deposit. Please try again.",
    };
  }
}

export async function createProofUpload(
  _prevState: UploadProofActionState,
  formData: FormData
): Promise<UploadProofActionState> {
  const rawData = {
    proofFile: formData.get("proofFile"),
    reference: formData.get("reference") ? String(formData.get("reference")) : ""
  };

  // Check if file is provided
  if (!rawData.proofFile) {
    return {
      success: false,
      error: "No proof file uploaded. Please select a file to continue."
    };
  }

  // Validate the data with schema
  const parsed = proofUploadSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid proof data. Please ensure all required fields are filled correctly."
    };
  }

  // Upload the file
  const res = await uploadFileAction(formData);
  console.log('Upload response: ',res);

  if (!res.success || !res.proofUrl) {
    return {
      success: false,
      error: res.message || "File upload failed. Please try again or check your file format/size."
    };
  }

  const data = {
    proofUrl: res.proofUrl,
    reference: rawData.reference
  };

  // Simulate saving to DB or API
  const result = await uploadDepositProofService(data.proofUrl)

  if(!result) {
     return {
      success: false,
      error: "Failed to save uploaded proof url."
    };
  }

  return {
    success: true,
    data: {
      // proofFile: data.proofUrl,
      reference: data.reference
    }
  };
}