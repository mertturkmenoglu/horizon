import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function TermsPage(): React.ReactElement {
  const { i18n } = useTranslation('common');
  i18n.language;

  if (i18n.language === 'tr') {
    return <TermsTurkish />;
  }

  return <TermsEnglish />;
}

function TermsEnglish(): React.ReactElement {
  return (
    <MainLayout>
      <div className="mx-auto my-16 max-w-2xl text-wrap">
        <h1 className="text-2xl font-bold">Horizon App - Terms of Service</h1>
        <div className="mt-2 font-semibold">
          Effective Date: January 15, 2024
        </div>
        <p className="mt-4">
          Welcome to Horizon! These Terms of Service ("Terms") govern your use
          of the Horizon application and its related services (the "Service").
          By using the Service, you agree to comply with and be bound by these
          Terms. If you do not agree with these Terms, please do not use the
          Service.
        </p>
        <ol className="mt-8 space-y-4">
          <li>
            <span className="font-bold">1. Acceptance of Terms</span>: By
            accessing or using Horizon, you acknowledge that you have read,
            understood, and agree to be bound by these Terms. Horizon reserves
            the right to update, change, or modify these Terms at any time
            without prior notice. It is your responsibility to review these
            Terms periodically.
          </li>
          <li>
            <span className="font-bold">2. User Registration</span>: To access
            certain features of the Service, you must register an account. You
            agree to provide accurate, current, and complete information during
            the registration process and to update such information to keep it
            accurate, current, and complete.
          </li>
          <li>
            <span className="font-bold">3. User Responsibilities</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Listing Services</span>: Users
                are solely responsible for the accuracy and completeness of the
                information provided when listing services. Horizon reserves the
                right to remove any content that violates these Terms or is
                deemed inappropriate.
              </li>
              <li>
                <span className="font-bold">b. Communication</span>: Users agree
                to use the communication features within the app responsibly.
                Any communication that is harassing, offensive, or violates the
                rights of others is strictly prohibited.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">4. Transactions</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Enlisting Services</span>: Users
                may enlist for services listed on Horizon. The transaction
                terms, including payment and service details, are to be agreed
                upon between the service provider and the user. Horizon is not
                responsible for any issues arising from transactions.
              </li>
              <li>
                <span className="font-bold">b. Service Providers</span>: Service
                providers are responsible for delivering the enlisted services
                as described. Failure to do so may result in account suspension
                or termination.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">5. Privacy Policy</span>: Your use of
            the Service is also governed by our Privacy Policy, which can be
            found
            <Link
              to="/privacy"
              className="ml-1 text-sky-600"
            >
              here
            </Link>{' '}
            and is incorporated by reference into these Terms.
          </li>
          <li>
            <span className="font-bold">6. Termination</span>: Horizon reserves
            the right to suspend or terminate your account at any time, without
            notice, for conduct that we believe violates these Terms or is
            harmful to other users of the Service, to Horizon, or to third
            parties.
          </li>
          <li>
            <span className="font-bold">7. Disclaimers</span>: Horizon is
            provided "as is" and without any warranty or condition, express,
            implied, or statutory. We do not guarantee the availability,
            accuracy, completeness, reliability, or timeliness of the Service.
          </li>
          <li>
            <span className="font-bold">8. Limitation of Liability</span>: In no
            event shall Horizon be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or
            revenues, whether incurred directly or indirectly.
          </li>
          <li>
            <span className="font-bold">9. Governing Law</span>: These Terms
            shall be governed by and construed in accordance with the laws of
            Turkey.
          </li>
          <li>
            <span className="font-bold">10. Contact Information</span>: For
            questions about these Terms or the Service, please contact us at
            gethorizonapp@gmail.com.
          </li>
        </ol>

        <p className="mt-8">
          By using the Horizon app, you agree to these Terms of Service. Thank
          you for being a part of our community!
        </p>
      </div>
    </MainLayout>
  );
}

function TermsTurkish(): React.ReactElement {
  return (
    <MainLayout>
      <div className="mx-auto my-16 max-w-2xl text-wrap">
        <h1 className="text-2xl font-bold">
          Horizon Uygulaması - Hizmet Şartları
        </h1>
        <div className="mt-2 font-semibold">
          Geçerlilik Tarihi: Ocak 15, 2024
        </div>
        <p className="mt-4">
          Horizon'a hoş geldiniz! Bu Hizmet Şartları ("Şartlar"), Horizon
          uygulaması ve ilgili hizmetlerinizi ("Hizmet") kullanımınızı
          düzenlemektedir. Hizmeti kullanarak, bu şartlara uymayı ve bağlı
          kalmayı kabul etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen
          hizmeti kullanmayın.
        </p>
        <ol className="mt-8 space-y-4">
          <li>
            <span className="font-bold">1. Şartların Kabul Edilmesi</span>:
            Horizon'a erişerek veya kullanarak, bu şartları okuduğunuzu,
            anladığınızı ve bu şartlara bağlı olmayı kabul ettiğinizi beyan
            edersiniz. Horizon, bu şartları önceden bildirim yapmaksızın
            herhangi bir zamanda güncelleme, değiştirme veya değiştirme hakkını
            saklı tutar. Bu şartları periyodik olarak gözden geçirmek sizin
            sorumluluğunuzdadır.
          </li>
          <li>
            <span className="font-bold">2. Kullanıcı Kaydı</span>: Hizmetin
            belirli özelliklerine erişmek için bir hesap kaydetmelisiniz. Kayıt
            sırasında doğru, güncel ve tam bilgi verme ve bu bilgileri doğru,
            güncel ve tam tutmak sizin sorumluluğunuzdadır.
          </li>
          <li>
            <span className="font-bold">3. Kullanıcı Sorumlulukları</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Hizmetleri Listeleme</span>:
                Kullanıcılar, hizmetleri listeledikleri bilgilerin doğruluğu ve
                eksiksizliğinden tamamen sorumludur. Horizon, bu şartları ihlal
                eden veya uygun bulunmayan herhangi bir içeriği kaldırma hakkını
                saklı tutar.
              </li>
              <li>
                <span className="font-bold">b. İletişim</span>: Kullanıcılar,
                uygulama içindeki iletişim özelliklerini sorumlu bir şekilde
                kullanmalıdır. Taciz edici, saldırgan veya diğerlerinin
                haklarını ihlal eden herhangi bir iletişim kesinlikle yasaktır.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">4. İşlemler</span>:
            <ol className="ml-4">
              <li>
                <span className="font-bold">a. Hizmetlere Kayıt</span>:
                Kullanıcılar, Horizon'da listelenen hizmetlere kaydolabilirler.
                İşlem şartları, ödeme ve hizmet detayları, hizmet sağlayıcı ve
                kullanıcı arasında anlaşılmalıdır. Horizon, işlemlerden
                kaynaklanan herhangi bir sorundan sorumlu değildir.
              </li>
              <li>
                <span className="font-bold">b. Hizmet Sağlayıcılar</span>:
                Hizmet sağlayıcıları, belirtildiği gibi hizmetleri teslim
                etmekten sorumludur. Bu yapılmadığında hesap askıya alınabilir
                veya sonlandırılabilir.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">5. Gizlilik Politikası</span>:
            Hizmetinizi kullanmanız aynı zamanda gizlilik politikamız tarafından
            da düzenlenir,{' '}
            <Link
              to="/privacy"
              className="ml-1 text-sky-600"
            >
              buradan
            </Link>{' '}
            bulabilir ve bu şartlar'a başvurarak bu Gizlilik Politikası'nı kabul
            etmiş sayılırsınız.
          </li>
          <li>
            <span className="font-bold">6. Sonlandırma</span>: Horizon, herhangi
            bir zamanda önceden bildirim yapmaksızın, bu şartları ihlal ettiğine
            inandığımız veya hizmetin diğer kullanıcılarına, Horizon'a veya
            üçüncü taraflara zarar veren bir davranış nedeniyle hesabınızı
            askıya alabilir veya sonlandırabilir.
          </li>
          <li>
            <span className="font-bold">7. Red ve İptal</span>: Horizon "olduğu
            gibi" ve herhangi bir garanti veya koşul olmaksızın sunulmaktadır,
            açık, zımni veya yasal. Hizmetin kullanılabilirliği, doğruluğu,
            eksiksizliği, güvenilirliği veya zamanında oluşu konusunda garanti
            vermiyoruz.
          </li>
          <li>
            <span className="font-bold">8. Sorumluluk Sınırlaması</span>:
            Horizon, doğrudan veya dolaylı olarak ortaya çıkan herhangi bir
            dolaylı, tesadüfi, özel, dolaylı veya cezai zarardan veya kar veya
            gelir kaybından sorumlu değildir.
          </li>
          <li>
            <span className="font-bold">9. Hüküm ve Koşulların Yönetimi</span>:
            Bu Şartlar Türkiye yasalarına tabi olacak şekilde düzenlenir ve
            yorumlanır.
          </li>
          <li>
            <span className="font-bold">10. İletişim Bilgileri</span>: Bu
            Şartlar veya Hizmetle ilgili sorularınız için lütfen bize
            gethorizonapp@gmail.com adresinden ulaşın.
          </li>
        </ol>

        <p className="mt-8">
          Horizon uygulamasını kullanarak, bu Hizmet Şartlarını kabul etmiş
          olursunuz. Topluluğumuzun bir parçası olduğunuz için teşekkür ederiz!
        </p>
      </div>
    </MainLayout>
  );
}

export default TermsPage;
