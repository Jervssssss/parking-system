let selectedSlot = "";
        let selectedParkingType = "";

        // Toggle visibility of sections
        function showSection(sectionId) {
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(sectionId).classList.remove('hidden');
        }

        // Show the parking slot selection after login
        function showSlotSelection(parkingType) {
            selectedParkingType = parkingType;
            alert('Selected: ' + parkingType);
            showSection('slot-section');
        }

        // Handle slot selection
        function selectSlot(slot) {
            selectedSlot = slot;
            showSection('fee-section');
        }

        // Handle duration form submission
        document.getElementById("duration-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const hours = document.getElementById("hours").value;
            const fee = calculateFee(hours);
            document.getElementById("fee").textContent = fee + " PHP";

            // Display receipt
            displayReceipt(hours, fee);
        });

        // Fee calculation function based on parking type
        function calculateFee(hours) {
            let rate;

            switch (selectedParkingType) {
                case 'Student Parking':
                    rate = 10; // 10 pesos per hour for students
                    break;
                case 'Teachers Parking':
                    rate = 5; // 5 pesos per hour for teachers
                    break;
                case 'Visitors Parking':
                    rate = 15; // 15 pesos per hour for visitors
                    break;
                case 'Principal Parking':
                    rate = 0;  // Free for principal
                    break;
                default:
                    rate = 0;
                    break;
            }

            return hours * rate;
        }
        

        // Display the receipt after payment
        function displayReceipt(hours, fee) {
            const receiptDetails = ` 
                <p><strong>Parking Type:</strong> ${selectedParkingType}</p>
                <p><strong>Parking Slot:</strong> ${selectedSlot}</p>
                <p><strong>Duration:</strong> ${hours} hours</p>
                <p><strong>Total Fee:</strong> ₱${fee.toFixed(2)}</p>
            `;
            document.getElementById("receipt-details").innerHTML = receiptDetails;
            showSection('receipt-section');
        }

        // Handle login
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;

            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                showSection('typesManagementSection');
            } else {
                alert("Invalid login details.");
            }
        });

        // Handle register
        document.getElementById("registerForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const newUsername = document.getElementById("newUsername").value;
            const newPassword = document.getElementById("newPassword").value;

            // Store new user data in localStorage
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);

            alert("Account created successfully! Redirecting to login.");
            showSection('loginSection');
        });

        // Handle forgot password
        document.getElementById("forgetPasswordForm").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Password reset instructions sent!");
            showSection('loginSection');
        });
        
        