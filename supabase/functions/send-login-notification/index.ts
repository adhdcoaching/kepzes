import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LoginNotificationRequest {
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name }: LoginNotificationRequest = await req.json();

    console.log("Sending login notification for:", name);

    // Send email using Resend API directly with fetch
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ADHD Coaching HUB <onboarding@resend.dev>",
        to: ["adhd@lovasszabolcs.hu"],
        subject: "Új bejelentkezés - ADHD Coaching HUB",
        html: `
          <h1>Új bejelentkezés történt</h1>
          <p>Az alábbi felhasználó bejelentkezett a platformra:</p>
          <p><strong>Név:</strong> ${name}</p>
          <p><strong>Időpont:</strong> ${new Date().toLocaleString('hu-HU')}</p>
          <br>
          <p>Üdvözlettel,<br>ADHD Coaching HUB rendszer</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-login-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
