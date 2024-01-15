import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function PrivacyPage(): React.ReactElement {
  const { i18n } = useTranslation('common');

  if (i18n.language === 'tr') {
    return <PrivacyTurkish />;
  }

  return <PrivacyEnglish />;
}

function PrivacyEnglish(): React.ReactElement {
  return (
    <MainLayout>
      <div className="mx-auto my-16 max-w-2xl text-wrap">
        <h1 className="text-2xl font-bold">Horizon App - Privacy Policy</h1>
        <div className="mt-2 font-semibold">
          Effective Date: January 15, 2024
        </div>
        <p className="mt-4">
          Welcome to Horizon! This Privacy Policy explains how Horizon ("we" or
          "us") collects, uses, shares, and protects information in relation to
          the Horizon mobile application and its services (the "Service"). By
          using the Service, you agree to the terms and practices outlined in
          this Privacy Policy.
        </p>
        <ol className="mt-8 space-y-4">
          <li>
            <span className="font-bold">1. Information We Collect</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Personal Information</span>: When
                you register an account, we may collect personal information
                such as your name, email address, and profile picture.
              </li>
              <li>
                <span className="font-bold">b. Service Information</span>: Users
                providing services may submit information about the services
                offered, including descriptions and pricing.
              </li>
              <li>
                <span className="font-bold">c. Transactional Information</span>:
                In the process of enlisting for services, transactional details,
                including payment information, may be collected.
              </li>
              <li>
                <span className="font-bold">d. Log Data</span>: We automatically
                collect certain information when you use the Service, including
                your IP address, device information, and usage patterns.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">2. How We Use Your Information</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">
                  a. Providing and Improving Services
                </span>
                : We use the collected information to deliver, maintain, and
                enhance the features and functionality of the Service.
              </li>
              <li>
                <span className="font-bold">b. Communication</span>: Your
                contact information may be used to send you important notices,
                updates, or promotional materials.
              </li>
              <li>
                <span className="font-bold">c. Analytics</span>: We may use
                third-party analytics tools to understand how users interact
                with the Service, helping us improve its performance and user
                experience.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">3. Sharing Your Information</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Service Providers</span>: We may
                share your information with third-party service providers who
                assist us in delivering and maintaining the Service.
              </li>
              <li>
                <span className="font-bold">b. Legal Compliance</span>: We may
                disclose your information if required by law or in response to
                valid requests from public authorities.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">4. Your Choices and Rights</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Account Information</span>: You
                can access and update your account information through the app's
                settings.
              </li>
              <li>
                <span className="font-bold">b. Communication Preferences</span>:
                You can choose to opt-out of receiving promotional emails or
                notifications.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">5. Security</span>: We prioritize the
            security of your information and employ industry-standard measures
            to protect it from unauthorized access, disclosure, alteration, and
            destruction.
          </li>
          <li>
            <span className="font-bold">6. Children's Privacy</span>: The
            Service is not directed to individuals under the age of 18. If we
            become aware that personal information has been collected from a
            child under 18, we will take steps to delete such information.
          </li>
          <li>
            <span className="font-bold">7. Changes to this Privacy Policy</span>
            : We reserve the right to update or modify this Privacy Policy at
            any time. You will be notified of any significant changes via email
            or through the app.
          </li>
          <li>
            <span className="font-bold">8. Contact Information</span>: If you
            have any questions or concerns about this Privacy Policy, please
            contact us at gethorizonapp@gmail.com.
          </li>
        </ol>

        <p className="mt-8">
          By using Horizon, you consent to the practices outlined in this
          Privacy Policy.
        </p>
      </div>
    </MainLayout>
  );
}

function PrivacyTurkish(): React.ReactElement {
  return (
    <MainLayout>
      <div className="mx-auto my-16 max-w-2xl text-wrap">
        <h1 className="text-2xl font-bold">Horizon - Gizlilik Politikası</h1>
        <div className="mt-2 font-semibold">
          Geçerlilik Tarihi: Ocak 15, 2024
        </div>
        <p className="mt-4">
          Horizon'a hoşgeldiniz! Bu Gizlilik Politikası, Horizon ("biz" veya
          "bizim") tarafından toplanan, kullanılan, paylaşılan ve Horizon
          uygulaması ve hizmetleri ("Hizmet") ile ilgili bilgilerin nasıl
          işlendiğini açıklar. Hizmeti kullanarak, bu Gizlilik Politikası'nda
          belirtilen şartlara ve uygulamalara onay vermiş olursunuz.
        </p>
        <ol className="mt-8 space-y-4">
          <li>
            <span className="font-bold">1. Topladığımız Bilgiler</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Kişisel Bilgiler</span>: Bir
                hesap oluşturduğunuzda, adınız, e-posta adresiniz ve profil
                resminiz gibi kişisel bilgileri toplayabiliriz.
              </li>
              <li>
                <span className="font-bold">b. Hizmet Bilgileri</span>: Hizmet
                sunan kullanıcılar, sunulan hizmetlere ilişkin açıklamalar ve
                fiyatlandırma dahil olmak üzere bilgiler sunabilirler.
              </li>
              <li>
                <span className="font-bold">c. İşlem Bilgileri</span>:
                Hizmetlere kayıt olurken, ödeme bilgileri de dahil olmak üzere
                işleme ilişkin detaylar toplanabilir.
              </li>
              <li>
                <span className="font-bold">d. Günlük Verileri</span>: Hizmeti
                kullanırken IP adresiniz, cihaz bilgileriniz ve kullanım
                desenleriniz gibi belirli bilgileri otomatik olarak
                toplayabiliriz.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">
              2. Bilgilerinizi Nasıl Kullandığımız
            </span>
            :
            <ol className="ml-4">
              <li>
                <span className="font-bold">
                  a. Hizmet Sağlama ve İyileştirme
                </span>
                : Toplanan bilgileri, Hizmetin özelliklerini ve işlevselliğini
                teslim etmek, sürdürmek ve geliştirmek için kullanırız.
              </li>
              <li>
                <span className="font-bold">b. İletişim</span>: İletişim
                bilgileriniz, size önemli bildirimler, güncellemeler veya
                promosyon malzemeleri göndermek için kullanılabilir.
              </li>
              <li>
                <span className="font-bold">c. Analitik</span>: Kullanıcıların
                Hizmetle nasıl etkileşimde bulunduğunu anlamak için üçüncü taraf
                analitik araçlarını kullanabiliriz, bu da performansını ve
                kullanıcı deneyimini geliştirmemize yardımcı olur.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">3. Bilgilerinizi Paylaşma</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Hizmet Sağlayıcılar</span>:
                Hizmeti teslim etmemizde ve sürdürmemizde bize yardımcı olan
                üçüncü taraf hizmet sağlayıcıları ile bilgilerinizi
                paylaşabiliriz.
              </li>
              <li>
                <span className="font-bold">b. Hukuki Uyum</span>: Bilgilerinizi
                yasal bir zorunluluk veya kamu otoritelerinden gelen geçerli
                taleplere yanıt olarak açıklayabiliriz.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">4. Seçimleriniz ve Haklarınız</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Hesap Bilgisi</span>: Hesap
                bilgilerinize uygulama ayarları aracılığıyla erişebilir ve
                güncelleyebilirsiniz.
              </li>
              <li>
                <span className="font-bold">b. İletişim Tercihleri</span>:
                Promosyon e-postaları veya bildirimler almayı reddetmeyi
                seçebilirsiniz.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">5. Güvenlik</span>: Bilgilerinizin
            yetkisiz erişim, açıklama, değiştirme ve yok etme karşısında
            korunması için endüstri standardı önlemlere öncelik veriyoruz.
          </li>
          <li>
            <span className="font-bold">6. Çocukların Gizliliği</span>: Hizmet
            18 yaşın altındaki bireylere yönelik değildir. 18 yaşın altındaki
            bir çocuktan kişisel bilgi toplandığını fark edersek, böyle
            bilgileri silme adımlarını atarız.
          </li>
          <li>
            <span className="font-bold">
              7. Bu Gizlilik Politikasının Değişiklikleri
            </span>
            : Bu Gizlilik Politikası'nı herhangi bir zamanda güncelleme veya
            değiştirme hakkını saklı tutarız. Önemli değişiklikler hakkında sizi
            e-posta veya uygulama üzerinden bilgilendireceğiz.
          </li>
          <li>
            <span className="font-bold">8. İletişim Bilgileri</span>: Bu
            Gizlilik Politikası ile ilgili herhangi bir sorunuz veya endişeniz
            varsa, lütfen bizimle gethorizonapp@gmail.com üzerinden iletişime
            geçin.
          </li>
        </ol>

        <p className="mt-8">
          Horizon'u kullanarak, bu Gizlilik Politikası'nda belirtilen
          uygulamalara onay vermiş olursunuz.
        </p>
      </div>
    </MainLayout>
  );
}

export default PrivacyPage;
