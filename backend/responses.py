# backend/responses.py

"""
RESPONSES maps a tuple of keywords → a reply string.
When the user's prompt contains ALL keywords (case-insensitive), we return that reply.
If multiple keys match, the first one in iteration order wins.
"""

RESPONSES = {
    # “About yourself” or “who are you”
    ("about", "yourself"): (
        "Hi! I'm Petros Gerogiannis, a fourth-year undergraduate student pursuing a "
        "Bachelor of Science in Computer Science at the University of Crete (Heraklion, Greece)."
    ),

    # Education / Where did you study?
    ("education",): (
        "I'm currently studying Computer Science at the University of Crete in Heraklion, Greece "
        "(Bachelor of Science, Sep 2021 - Present)."
    ),
    ("where", "study"): (
        "I studied (and am studying) Computer Science at the University of Crete, Heraklion, Greece "
        "(B.Sc. started Sep. 2021)."
    ),

    # Technical Skills / What skills do you have?
    ("skills",): (
        "My technical skills include:\n"
        "- Languages: C, C++, Java, Bash, Python, JavaScript, HTML, and CSS.\n"
        "- Cloud & Backend Development: Docker, Kubernetes, AWS, REST APIs, Flask, Spring Boot, Servlets, Jersey.\n"
        "- Cloud Orchestration: Docker & Kubernetes.\n"
        "- Parallel & Distributed Computing: POSIX threads, MPI.\n"
        "- Networking: POSIX sockets, basic network configuration & administration, understanding of network protocols."
    ),

    # Projects – general “projects” keyword
    ("projects",): (
        "Here are some of my key projects:\n"
        "1) Docker & Kubernetes Orchestration:\n"
        "   - Developed custom Docker images for Nginx and Django apps, including lifecycle management, live container modifications, "
        "and persistent volume integration.\n"
        "   - Automated CI/CD pipelines using GitHub Actions.\n"
        "   - Created Kubernetes manifests for scalable deployments (Jobs, CronJobs, Deployments, Services, Ingress, Autoscalers) "
        "and wrote Helm charts to streamline dynamic service configs.\n\n"
        "2) Custom VPN with Automated Egress IP Rotation (in development):\n"
        "   - Implementing a private VPN service on Kubernetes (Minikube for development, DigitalOcean for production) that "
        "dynamically rotates outbound IPs.\n"
        "   - Engineered a workflow with custom Kubernetes Operators to periodically provision and assign new Floating IPs to VPN pods.\n\n"
        "3) Compiler & Runtime VM for “Alpha” language:\n"
        "   - Built a full compiler in C using Lex/Yacc tools, plus a runtime virtual machine with memory management "
        "and supporting library functions.\n\n"
        "4) Full-Stack Web & Cloud Computing:\n"
        "   - Implemented cloud-based services and RESTful APIs on AWS (Lambda, Step Functions, API Gateway, DynamoDB, S3, EC2) "
        "for tasks like user authentication, XML parsing, and geographic data enrichment.\n"
        "   - Simulated a resource allocation problem in cloud computing (game-theoretic approach + brute-force optimization) using "
        "AWS for user submission handling and allocation processing.\n"
        "   - Built a pet-care services web app connecting pet owners and sitters, integrating external APIs (OpenStreetMap, Google Charts, OpenAI).\n"
        "   - Created an electric vehicle rental system with a normalized MySQL database (3NF) and a JavaScript/HTML/CSS frontend for managing rentals, bookings, and payments.\n\n"
        "5) Distributed & Parallel Computing:\n"
        "   - Developed a distributed airline reservation simulation in C using POSIX threads, with concurrent shared data structures handling multiple agency threads and airline threads.\n"
        "   - Built an event-driven distributed satellite communications simulation in C using MPI, with a coordinator process, satellite ring topology, ground station tree structure, and a leader election algorithm for reliable inter-process communication.\n\n"
        "6) Networking:\n"
        "   - miniperf: Created a network performance measurement tool in C (client-server POSIX sockets + threads), mimicking iperf3. "
        "It measures throughput, goodput, jitter, packet loss, one-way delay, supports parallel UDP streams, precise timing with monotonic clocks, and non-blocking sockets.\n"
        "   - SMTP Server Project: Built a basic SMTP server using Postfix and Procmail, configured with a custom DNS domain and "
        "virtual mailboxes for each user.\n\n"
        "7) Computer Architecture Simulation:\n"
        "   - Used gem5 to complete sim assignments in Computer Systems Architecture: implemented GAg and PAg branch predictors and evaluated their performance (IPC and branch misprediction analysis).\n"
        "   - Explored Out-of-Order CPU design by tuning microarchitectural parameters (ROB entries, functional unit counts, LSQ sizes) to optimize instruction-level parallelism.\n"
        "   - Simulated and optimized various L1/L2 cache configurations."
    ),

    # Specific “Docker” or “Kubernetes” question
    ("docker", "kubernetes"): (
        "I have extensive Docker & Kubernetes experience:\n"
        "- Created custom Docker images for Nginx & Django applications, handling lifecycle management, live container updates, and persistent volumes.\n"
        "- Automated CI/CD pipelines with GitHub Actions.\n"
        "- Wrote Kubernetes manifests for Jobs, CronJobs, Deployments, Services, Ingress, and Horizontal Pod Autoscalers.\n"
        "- Developed Helm charts to streamline dynamic service configurations."
    ),

    # “VPN” or “egress” rotation
    ("vpn", "egress"): (
        "I'm currently developing a custom VPN with automated egress IP rotation:\n"
        "- Implemented a private VPN service on Kubernetes (using Minikube locally, DigitalOcean in production).\n"
        "- Built custom Kubernetes Operators to periodically provision and assign new Floating IPs to VPN pods."
    ),

    # Compiler project
    ("compiler", "alpha"): (
        "I built a compiler and runtime VM for a proprietary language called “Alpha”:\n"
        "- Used C with Lex and Yacc to implement lexical analysis, parsing, and code generation.\n"
        "- Created a runtime virtual machine with memory management and supporting library functions."
    ),

    # Cloud & AWS
    ("aws", "lambda"): (
        "I've implemented multiple cloud-based services and RESTful APIs on AWS:\n"
        "- Used AWS Lambda, Step Functions (State Machine), API Gateway, DynamoDB, S3, EC2, and SQS for tasks such as user authentication, XML parsing, and geographic data enrichment.\n"
        "- Created a simulation for a cloud resource allocation problem using AWS services for user submission and allocation processing."
    ),

    # Distributed & Parallel
    ("distributed", "parallel"): (
        "In distributed & parallel computing:\n"
        "- Implemented a distributed airline reservation system in C with POSIX threads, handling multiple agency threads and airline threads concurrently.\n"
        "- Developed an event-driven satellite communications simulation in C using MPI, featuring a coordinator, a ring of satellite processes, ground station processes in a tree structure, and a leader election algorithm."
    ),

    # Networking / miniperf
    ("networking",): (
        "My networking experience includes:\n"
        "- Built **miniperf**, a network performance measurement tool in C (client-server model with POSIX sockets & threads), similar to iperf3. Measures throughput, goodput, jitter, packet loss, one-way delay, supports parallel UDP streams with precise timing.\n"
        "- Developed a basic SMTP server using Postfix and Procmail, configured with its own DNS domain and virtual mailboxes for each user."
    ),

    # Computer Architecture
    ("architecture", "gem5"): (
        "In computer architecture simulation:\n"
        "- Used gem5 to implement branch predictors (GAg, PAg) and evaluated performance (IPC, branch misprediction rates).\n"
        "- Explored out-of-order CPU design by tuning ROB entries, functional unit counts, and LSQ sizes to optimize instruction-level parallelism.\n"
        "- Simulated various L1/L2 cache configurations and analyzed their performance."
    ),

    # Fallback if nothing else matches
    (""):
        (
            "Sorry, I don't have an answer for that yet. "
            "Feel free to ask about my education, technical skills, projects, or specific technologies like Docker, Kubernetes or AWS."
        ),
}


def find_reply(prompt: str) -> str:
    """
    Look for the first key in RESPONSES whose keywords are ALL found in the prompt.
    - We lowercase everything for a case-insensitive match.
    - If none match, return the fallback associated with the empty tuple key.
    """
    prompt_lower = prompt.lower()

    for keywords, answer in RESPONSES.items():
        # Skip the fallback empty-tuple key until the end
        if keywords == ():  
            continue
        if all(keyword in prompt_lower for keyword in keywords):
            return answer

    # Return fallback (empty-tuple key) if nothing matched
    return RESPONSES.get((), "Sorry, I don't have an answer for that yet.")

