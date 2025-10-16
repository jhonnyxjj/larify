import admin from "firebase-admin";

try {
  // Decodifica a variável base64
  console.log("Base64:", process.env.FIREBASE_SERVICE_ACCOUNT_BASE64);

  const serviceAccount = JSON.parse(
    
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, "base64").toString("utf8")
  );

  // Inicializa o Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // Faz uma chamada real pro Firebase Auth
  const auth = admin.auth();

  // Teste: listar usuários
  const listUsers = await auth.listUsers(1);
  console.log("✅ Firebase Admin conectado com sucesso!");
  console.log("Usuário de teste:", listUsers.users[0]?.uid || "Nenhum usuário encontrado");

} catch (err) {
  console.error("❌ Erro ao conectar com o Firebase Admin:");
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err);
  }
}
